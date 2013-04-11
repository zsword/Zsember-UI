/**
 * Class System Module
 * @author JemiZhuu(周士淳,ZSword)
 * @version 0.1
 * @since 2013-4-11
 */
define(function(require, exports, module) {

var _global = this;
var TplModule = require('{Zsember}/util/ExtHandlebars');
exports.renderTplHtml = TplModule.renderTplHtml;
exports.renderCheckbox = TplModule.renderCheckbox;
exports.renderRadio = TplModule.renderRadio;
var processTplViewBinds = TplModule.processTplViewBinds;
function debugLog() {
	if(!this.console) {
		return;
	}
	var args = [new Date().toLocaleString()+': '].concat(arguments);
	console && console.debug && console.debug.apply(console, args);
}
_global.debugLog = debugLog;
/** define utils
------------------------------ */	
var EmptyFn = function(){};
exports.FalseFn = function(){return false;}
function isNormalValue(obj) {
	var type = typeof obj;
	return /string|number|boolean/g.test(type);
}
function isString(obj) {
	return $.type(obj)=='string';
}
function isNumber(obj) {
	return !isNaN(parseInt(obj));
}
var isArray = $.isArray;
var isFunction = $.isFunction;
var isObject = $.isPlainObject;
function isBlank(obj) {
	if(obj==undefined || obj==null || obj=='') {
		return true;
	}
	if(isArray(obj)) {
		return obj.length<1;
	}
	return false;
}
var apply = $.extend;
var proxyFn = $.proxy;
var assert = function(desc, test) {
	if (!test) throw new Error("assertion failed: "+desc);
};
apply(String.prototype, {
	capitalize: function() {
		return this.charAt(0).toUpperCase()+this.substr(1);
	}
});
/** define Base Class System
------------------------------ */
var Loader = seajs;
var Namespace = Ember.Namespace;
var TplHelper = Handlebars;
var TemplateHelper = Ember.Handlebars;
TemplateHelper.registerHelper('outData', function(data, field, options) {
	if(arguments.length<3) {
		options = field;
		field = this;
	} else {
		field = TemplateHelper.get(this, field, options);
	}
	var prop = field.field||field.name;
	var render = field.renderer;
	data = TemplateHelper.get(this, data, options);
	if(render) {
		var value = data[prop];
		render = proxyFn(render, this, value, data);
	}
	options.contexts = data;
	options.fn = options.fn||render;
	return TemplateHelper.helpers.bind.call(data, prop, options);
});
function getNamespace(className) {
	return ClassManager.getNamespace(className);
}
function processRequireAppControllers(config) {
	var className = config.$className,
		appNS = getNamespace(className),
		controllers = config.controllers;
	if(controllers) {
		for(var i=0;i<controllers.length;i++) {
			controllers[i] = appNS.to('controller.'+controllers[i]);
		}
		Zsember.require(controllers);
	}
}
function processAppControllerRequires(config) {
	var className = config.$className,
		appNS = getNamespace(className),
		modules = [];
	var models = config.models;
	if(models) {
		modules = modules.concat(models);
	}
	var stores = config.stores;
	if(stores) {
		modules = modules.concat(stores);
	}
	var views = config.views;
	if(views) {
		modules = modules.concat(views);
	}
	if(modules.length) {
		Zsember.require(modules);
	}
}
var ObjectClass = Ember.Object;
ObjectClass.reopen({
	callSuper: function() {		
		return this._super.apply(this, arguments);
	}
});
var View = Ember.View;
/** Base Object Class
------------------------------ */
var Class = ObjectClass.extend();
/** Common Object Class
------------------------------ */
var CommonObject = Class.extend(Ember.Evented, {
	init: function() {
		//this.fireEvent = this.fire;
		this.fireEvent = this.trigger;
		this.onInit();
		this._super();
	},
	onInit: EmptyFn
});
/** Model Base Class
------------------------------ */
var ModelBase = Class.extend({
	isModel: true,
	getRaw: function() {
		var me = this,
			raw = me._raw = me._raw||{};
			fields = me.fields;
		for(var i=0;i<fields.length;i++) {			
			var f = fields[i];
			var fname = f.name;
			raw[fname] = me[fname];
		}
		return raw;
	}
});
ModelBase.reopenClass({
	extend: function(data) {
		var me = this,
			fields = data.fields;
		var modelType = me._super.apply(me, arguments);
		modelType.fields = fields;
		return modelType;
	}
});
/** Store Base Class
------------------------------ */
var StoreBase = CommonObject.extend({
	isStore: true,
	onInit: function() {
		var me = this;
		me.initStore();
		me.initData();
	},
	initStore: EmptyFn,
	initData: EmptyFn
});
function toSafeString(text) {
	return new Handlebars.SafeString(text);
}
//Core utility functions
function createByAlias(alias, config) {
	return ClassManager.createByAlias(alias, config);	
}
function createWidget(widget, config) {
	if(isString(widget)) {
		config = config||{};
		config.widget = widget;
	} else {
		config = widget;
	}
	var alias = 'widget.'+config.widget;
	return createByAlias(alias, config);
}
function createStore(store, config) {	
	if(store.type) {
		config = store;
	} else {
		config = config||{};
		config.type = store;
	}
	var alias = 'store.'+config.type;
	return createByAlias(alias, config);
}
/** Widget Class
------------------------------ */
function createWidget(widget, config) {
	if(widget.widget) {
		config = widget;
	} else {
		config = config||{};
		config.widget = widget;		
	}
	var alias = 'widget.'+config.widget;
	return createByAlias(alias, config);
}
function processTemplate(template, isTpl) {
	if(!template) {
		return undefined;
	}
	if(isArray(template)) {
		template = template.join('');
	}
	if(isString(template)) {
		if(isTpl) {
			template = TplHelper.compile(template);
		} else {
			template = TemplateHelper.compile(template);
		}
	}	
	return template;
}
function processViewTpls(data) {
	data.renderTpl = processTemplate(data.renderTpl, true);
	data.headerTpl = processTemplate(data.headerTpl, true);
	data.bodyTpl = processTemplate(data.bodyTpl, true);	
	data.rowTpl = processTemplate(data.rowTpl, true);
}
function processStyleBindings(binds) {
	return function() {
		var ui = this,
			styles = [];		
		for(var i=0;i<binds.length;i++) {
			var p = binds[i];
			var val = ui[p];
			if(!val) {
				continue;
			}
			if(/width|height|top|left/g.test(p)) {
				val = isNumber(val)? val+'px' : val;
			}
			styles.push(p+':'+val+';');
		}
		return styles.join('');		
	}.property('wdith', 'height', 'top', 'left');
}
function processViewListeners(ui, listeners) {
	if(!listeners) {
		return undefined;
	}
	var view = ui.getView();
	for(var p in listeners) {
		var fn = listeners[p],
			context = fn.context||ui,
			handler = undefined;
		if(!isFunction(fn)) {
			handler = fn.handler;
			fn = fn.fn;
		}
		fn = proxyFn(fn, context);
		if(handler) {
			view.on(p, handler, fn);
		} else {
			view.on(p, fn);
		}
	}
	return listeners;
}
function closeView(ui) {
	ui = ui||this;
	if(!ui.autoDestroy) {
		var view = ui.getView();
		if(view) {
			view.hide();
		}
		return;
	}
	ui.destroy();
}
function showView(ui) {
	ui = ui||this;
	var view = ui.getView();
	if(view) {
		view.show();
		return;
	}
}
function hideView(ui) {
	ui = ui||this;
	var view = ui.getView();
	if(view) {
		view.hide();
		return;
	}	
}
function toggleView(ui) {
	ui = ui||this;
	var view = ui.getView();
	if(view) {
		view.toggle();
		return;
	}	
}
function isViewVisible(ui) {
	ui = ui||this;
	var view = ui.getView();
	return view && view.is(':visible');
}
function processViewInsert(ui) {
	var listeners = ui.listeners;
	if(listeners) {
		delete ui.listeners;
		processViewListeners(ui, listeners);
	}
	return ui;
}
function processOnViewInit(ui) {
	ui.fireEvent = ui.trigger;
	if(ui.fitView==true) {
		var classNames = ui.classNames;
		classNames = classNames.contains('lo-fit')? classNames:['lo-fit'].concat(classNames);
		ui.classNames = classNames;
	}
	ui.on('didInsertElement', function() {
		var ui = this,
			view = ui.getView();
		if(view) {
			if(!view._inited) {
				view._inited = true;
				processViewInsert(ui);
				ui.renderView();
			}
		}
		return ui._super();
	});
}
function addViewListeners(ui, cfg) {
	var view = ui.getView(),
		listeners = ui.listeners;
	if(view) {
		processViewListeners(ui, cfg);			   
	} else {
		listeners = ui.listeners = listeners||{};
		apply(listeners, cfg);
	}
	return listeners;
}
function doRenderView(isFirst, ui) {
	ui = ui||this;
	var view = ui.getView(),
		htmlTpl,
		htmlEl;
	if(isFirst) {
		htmlEl = ui.renderEl;
		htmlTpl = ui.renderTpl;
	} else {
		htmlEl = ui.bodyEl,
		htmlTpl = ui.bodyTpl;
	}
	if(htmlTpl) {
		var htmlContent = htmlTpl({view:ui});
		if(htmlEl) {
			view.find(htmlEl).html(htmlContent);
		} else {
			view.append(htmlContent);
		}
	}
	processTplViewBinds(view);
	if(isFirst) {
		ui.trigger('onFirstRender');
	}
	ui.trigger('onRender');	
}
function getViewFromUI(ui) {
	ui = ui||this;
	if(!ui.currentState) {
		return undefined;
	}
	var view = ui._$view;
	if(!view) {
		var elem = ui.get('element');
		view = elem? $(elem):view;
		ui._$view = view;
	}
	return view;
}
function getViewParent(ui) {
	ui = ui||this;
	return ui.get('parentView');	
}
var Widget = View.extend({
	init: function() {
		processOnViewInit(this);
		this.initComponent();
		this._super();
	},	
	initComponent: EmptyFn,
	renderView: function() {
		var me = this;
		me.doRender(true);		
	},
	renderTpl: undefined,
	doRender: doRenderView,
	onFirstRender: EmptyFn,
	onRender: EmptyFn,
	getView: getViewFromUI,
	getParentView: getViewParent,
	close: closeView,
	show: showView,
	hide: hideView,
	toggle: toggleView,
	isVisible: isViewVisible,
	setAttrs: function(key, value) {
		if(value) {
			this.set(key, value);
		} else {
			for(var v in key) {
				this.set(v, key[v]);
			}				
		}			
	},
	setDraggable: function(options) {
		var me = this,
			view = me.getView();
		var dragCallback = options.stop;
		delete options.stop;
		options = apply({
			'containment': 'parent',				
			'stop': function() {
        		offset = view.offset();
        		me.set('top', offset.top);
        		me.set('left', offset.left);
        		if(dragCallback) {
        			return dragCallback.apply(this, arguments);
        		}
        	}	            
		}, options);
		view.draggable(options);
	},
	setResizable: function(options) {
		var me = this,
			view = me.getView();
		var resizeCallback = options.stop;
		delete options.stop;
		options = apply({
            'minHeight': me.minHeight,
            'minWidth': me.minWidth,
            'containment': 'parent',
            'handles': 'n, e, s, w, ne, se, sw, nw',
            'stop': function() {
    			me.set('width', view.width());
    			me.set('height', view.height());
    			if(resizeCallback) {
    				return resizeCallback.apply(this, arguments);
    			}
			}			
		}, options);
		view.resizable(options);
   },
   addListeners: function(cfg) {
	   addViewListeners(this, cfg);
   },
   refresh: function() {
	   var me = this;
	   me.doRender();
   }   
});
Widget.reopenClass({
	extend: function(data) {
		var cfg = data,
			length = arguments.length;
		if(length>1) {
			cfg = arguments[length-1];
		}		
		if(cfg) {
			cfg.layout = processTemplate(cfg.layout);
			cfg.template = processTemplate(cfg.template);
			processViewTpls(cfg);
			if(cfg.styleBinds) {
				var attrBindings = cfg.attributeBindings = cfg.attributeBindings||[];
				attrBindings.push('style');
				cfg.style = processStyleBindings(cfg.styleBinds);
			}
		}			
		return this._super.apply(this, arguments);
	},
	create: function(config) {
		var binds = config.parentViewBinds;
		if(binds) {
			for(var i=0;i<binds.length;i++) {
				var b = binds[i];
				var bindAttr = b+'Binding';
				config[bindAttr] = 'parentView.'+b;
			}
		}
		return this._super.apply(this, arguments);
	}	
});
/** List Widget Class
------------------------------ */
var ListWidget = Ember.CollectionView.extend({
	_contentWillChange: Ember.beforeObserver(function() {
	    var content = this.get('content');
	    if (content && content.removeArrayObserver) { content.removeArrayObserver(this); }
	    var len = content ? Ember.get(content, 'length') : 0;
	    this.arrayWillChange(content, 0, len);
	  }, 'content'),		
	init: function() {
		this.initComponent();
		this._super();
		this.afterInit();
	},
	initComponent: EmptyFn,
	afterInit: EmptyFn
});
/** Container Widget Class
------------------------------ */
var ContainerWidget = Ember.ContainerView.extend({
	init: function() {
		processOnViewInit(this);
		this.initComponent();
		this._super();
		this._initItems();
	},
	initComponent: EmptyFn,	
	_initItems: function() {
		var items = this.items;		
		if(isArray(items)) {
			for(var i=0;i<items.length;i++) {
				this.addItem(items[i]);
			}
		} else if(items) {
			this.addItem(items);
		}
	},
	renderView: function() {
		var me = this;
		me.doRender(true);		
	},
	doRender: doRenderView,
	onFirstRender: EmptyFn,
	onRender: EmptyFn,
	addItem: function(item) {
		var me = this;
		if(!me.currentState) {
			var items = me.items = me.items||[];
			items.push(item);
			return item;
		}
		if(!item.isView) {
			item = createWidget(item);
		}
		return me.get('childViews').pushObject(item);
	},
	addListeners: function(cfg) {
		addViewListeners(this, cfg);
	},	
	getView: getViewFromUI,
	getParentView: getViewParent,
	getChildViews: function() {
		return this.get('childViews');
	},
	close: closeView,
	show: showView,
	hide: hideView,
	toggle: toggleView,
	isVisible: isViewVisible
});
/** Application Base Class
------------------------------ */
var ApplicationBase = CommonObject.extend({
	isApplication: true,
	init: function() {
		this.initApp();
		this._super();
	}	
});
ApplicationBase.reopenClass({
	isMvcType: true
});
/** Controller Base Class
------------------------------ */
var ControllerBase = Ember.Controller.extend();
ControllerBase.reopenClass({
	isMvcType: true
});

/** ClassManager
------------------------------ */
var ClassManager = Namespace.create({
	ClassMappings: {},
	AliasMappings: {},
	createByAlias: function(alias, config) {
		var type = this.AliasMappings[alias];
		if(!type) {
			throw new TypeError('Unknow Class with alias ['+alias+']');
		}
		return (type.singleton==true)? type : this.create(type, config);
	},
	create: function(type, config) {
		var defineType = type;
		if(isString(defineType)) {
			defineType = this.getClass(defineType);
		}	
		assert('Class to create must defined! '+type, defineType && defineType.create);
		return defineType.create(config);
	},	
	getClass: function(className) {		
		if(!isString(className)) {
			return className;
		}
		var type = this.ClassMappings[className];
		if(type) {
			return type;
		}
		var packg = this.getPackage(className, true),
			index = className.lastIndexOf('.'),
			simpleName = className.substr(index+1);
		if(!packg) {
			alert(className);
		}			
		return packg[simpleName];
	},
	getNamespace: function(className) {
		var index = className.indexOf('.'),
			nsName = className.substr(0, index);			
		return _global[nsName];
	},	
	getPackage: function(className, autoCreate) {
		if(!isString(className)) {
			return undefined;
		}
		var nameArray = className.split('.'),
			packg = _global;
		for(var i=0;i<nameArray.length-1;i++) {
			var cur = packg[nameArray[i]];
			if(!cur) {
				if(autoCreate) {
					cur = packg[nameArray[i]] = {};
				} else {			
					alert(nameArray[i]);
					return undefined;
				}
			}
			packg = cur;
		}
		return packg;
	},
	registerClass: function(type, config) {
		var className = config.$className,
			packg = this.getPackage(className),
			index = className.lastIndexOf('.'),
			simpleName = className.substr(index+1);			
		this.ClassMappings[className] = packg[simpleName] = type;
		if(config.isMixin) {
			return type;
		}
		var alias = config.alias;
		if(alias) {
			this.AliasMappings[alias] = type;
		}		
		return packg[simpleName];
	},
	registerNamespacePath: function(ns, path) {
		var nsName = ns.name,
			loaderVars = Loader.config.data.vars;
		loaderVars[nsName] = path;		
	},
	getClassesPath: function(className) {
		if(isArray(className)) {
			var results = [];
			for(var i=0;i<className.length;i++) {
				results.push(this.getClassesPath(className[i]));
			}
			return results;
		}
		className = className.replace(/\./g, '/');
		var nsName = className.split('/')[0];
		className = '{'+nsName+'}'+className.substr(nsName.length);
		return Loader.resolve(className);
	}
});
var Arrays = require('{Zsember}/util/Arrays');
exports.Arrays = Arrays.Arrays;
var Maps = require('{Zsember}/util/Maps');
exports.IndexMap = Maps.IndexMap;
var JsonModule = require('{Zsember}/util/Jsons');
exports.JsonUtils = JsonModule.JsonUtils;
var StorageModule = require('{Zsember}/util/Storages');
exports.StorageUtils = StorageModule.StorageUtils;
var CookieModule = require('{Zsember}/util/Cookies');
exports.Cookies = CookieModule.Cookies;

exports._global = _global;
exports.EmptyFn = EmptyFn;
exports.assert = assert;
exports.apply = apply;
exports.proxyFn = proxyFn;
exports.isNormalValue = isNormalValue;
exports.isString = isString;
exports.isArray = isArray;
exports.isNumber = isNumber;
exports.isFunction = isFunction;
exports.isBlank = isBlank;

exports.Namespace = Namespace;
exports.Mixin = Ember.Mixin;
exports.Object = Class;
exports.CommonObject = CommonObject;
exports.ModelBase = ModelBase;
exports.StoreBase = StoreBase;
exports.Widget = Widget;
exports.ListWidget = ListWidget;
exports.ContainerWidget = ContainerWidget;
exports.ApplicationBase = ApplicationBase;
exports.ControllerBase = ControllerBase;

exports.ClassManager = ClassManager;

exports.createByAlias = createByAlias;
exports.createWidget = createWidget;
exports.createStore = createStore;

});
	