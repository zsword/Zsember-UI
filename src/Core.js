/**
 * Zsember - JavaScript Framework
 * @author 2012, JemiZhuu(周士淳,ZSword)
 * @version 0.1
 * @since 2013-4-11
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * Can be used in GPL applications / NOT for Commercial use
 * 
 * Project Website:
 * http://github.com/ZSEmber_for_Websites.html
 *
 * @requires - 
 * Handlebars.js - http://handlebarsjs.com/
 * Ember.js - http://emberjs.com/
 * Sea.js - http://seajs.org
 * jQuery - http://jquery.com
 * jQuery-UI - http://jqueryui.com  
 * jQuery Easing - http://gsgd.co.uk/sandbox/jquery/easing/
 * 
 */
define(function(require, exports, module) {
//'use strict';
var LIB = 'Zsember';
var Loader = seajs;

var System = require('{Zsember}/ClassSystem');
var _global = System._global;
var assert = System.assert;
var isString = System.isString;
var isArray = System.isArray;
var isFunction = System.isFunction;
var IndexMap = System.IndexMap;
 
var Namespace = System.Namespace;
var Mixin = System.Mixin;
var Widget = System.Widget;
var ViewWidget = System.ViewWidget;

var ClassManager = System.ClassManager;

//Core utility functions
var createByAlias = System.createByAlias;
var createWidget = System.createWidget;
var createStore = System.createStore;
function _registerClass(defineClass, data) {
	return ClassManager.registerClass(defineClass, data);
}
var Zsember = _global[LIB] = {
	version: '0.1-SNAPSHOT',
	assert: assert,
	isString: isString,
	isArray: isArray,
	isFunction: isFunction
};
var _CoreUtils = ['EmptyFn', 'isNumber', 'apply', 'proxyFn',
    'isBlank',
    'Arrays', 'isNormalValue', 'JsonUtils', 'StorageUtils', 'Cookies',
    'renderTplHtml', 'renderCheckbox', 'renderRadio',
    'Object', 'CommonObject', 'ModelBase', 'StoreBase',
    'ListWidget', 'ContainerWidget', 
    'ApplicationBase', 'ControllerBase'];
for(var i=0;i<_CoreUtils.length;i++) {
	var key = _CoreUtils[i];
	var util = System[key];
	if(!util) {
		alert(key);
	}
	Zsember[key] = util;
}
function configLoaderPath(vars) {
	Loader.config({
		vars: vars
	});
}
_LazyDefineMap = new IndexMap();
function _addLazyDefineFn(key, fn, depends) {
	_LazyDefineMap.set(key, {'fn':fn, 'depends':depends});
}
function _runDefineFn(key) {
	var fnObj = _LazyDefineMap.remove(key);
	if(!fnObj) {
		return;
	}
	var depends = fnObj.depends;
	if(depends && depends.length) {
		for(var i=0;i<depends.length;i++) {
			var dep = depends[i];		
			_runDefineFn(dep);
		}
	}
	var fn = fnObj.fn;
	return fn.call(this);
}
function _finishLazyDefineFns() {
	while(_LazyDefineMap.size()>0) {
		var key = _LazyDefineMap.popKey();
		_runDefineFn(key);
	}
}
var _LoadedClassCache = {}; 
//create Core Namespace
Zsember.apply(Zsember, {
	/*apply: apply,
	isString: isString,
	isNumber: isNumber,
	isFunction: isFunction,
	isArray: isArray,
	assert: assert,
	EmptyFn: EmptyFn,
	Class: Class,
	ModelBase: Model,
	StoreBase: Store,
	AbstractContainer: ContainerView,
	ApplicationBase: ApplicationBase,
	ControllerBase: ControllerBase,*/
    ASC: 'ASC',
    DESC: 'DESC',
	_requiresLength: 0,
	_readyFns: [],
	fireRequiresChange: function(amount) {
		this._requiresLength+=amount;
		if(this._requiresLength<1) {
			this.onReady();
		}
	},
	onReady: function(fn) {
		var me = this,
			readyFns = me._readyFns;
		if(fn) {
			readyFns.push(fn);
		}
		if(me._requiresLength<1) {
			_finishLazyDefineFns();
			if(me._requiresLength>0) {
				return;
			}
			while(readyFns.length>0) {
				readyFns.shift().call(this);
			}
		}
	},
	configLoader: configLoaderPath,
	loadResources: function(resources) {
		require.async(resources);
	},
	require: function(modules, callback) {
		var me = this;
		me.fireRequiresChange(1);
		function requireCallback() {
			if(callback) {
				callback.apply(me, arguments);
			}
			me.fireRequiresChange(-1);
		};		
		var tmpModules = modules;
		modules = [];		
		for(var i=0;i<tmpModules.length;i++) {
			var m = tmpModules[i];
			if(_LoadedClassCache[m]) {
				continue;
			}			
			modules.push(m);
			_LoadedClassCache[m] = true;
		}
		if(!modules.length) {
			return requireCallback();
		}
		modules = ClassManager.getClassesPath(modules);
		require.async(modules, requireCallback);		
	},
	getClass: function(className) {
		return ClassManager.getClass(className);
	},
	_resolveRequireModule: function(module) {
		if(isArray(module)) {
			var results = [];
			for(var i=0;i<module.length;i++) {
				var mod = this._resolveRequireModule(module[i]);
				if(isString(mod)) {
					results.push(mod);
				}
			}
			return results;
		}
		var mod = module;
		if(isString(mod)) {
			mod = this.getClass(mod);
		}
		return mod||module;
	},
	_resolveAppModuleName: function(appNS, packg, modules) {
		if(!modules.length) {
			return modules;
		}		
		packg = '.'+packg+'.';
		var packgNS = appNS+packg;
		var appModules = [];
		for(var i=0;i<modules.length;i++) {
			var mod = modules[i];
			if(mod.indexOf(packg)==-1) {
				mod = packgNS+mod;
			}
			appModules.push(mod);
		}
		return appModules;
	},	
	_resolveMvcAppModule: function(config) {
		var me = this,
			controllers = config.controllers,
			models = config.models,
			stores = config.stores,
			views = config.views,
			className = config.$className,
			appNS = className.split('.')[0],			
			packgNS = undefined;
		var appModules = [];
		if(controllers) {
			appModules = appModules.concat(me._resolveAppModuleName(appNS, 'controller', controllers));
		}
		if(models) {
			appModules = appModules.concat(me._resolveAppModuleName(appNS, 'model', models));
		}
		if(stores) {
			appModules = appModules.concat(me._resolveAppModuleName(appNS, 'store', stores));
		}
		if(views) {
			appModules = appModules.concat(me._resolveAppModuleName(appNS, 'view', views));
		}
		appModules = me._resolveRequireModule(appModules);		
		return appModules;
	},	
	_createMixin: function(mixinClass, data) {
		var mix = mixinClass.create(data);
		_registerClass(mix, data);
		return mix;
	},
	/**
	 * define a Class
	 */
	define: function(className, data, createFn) {
		var me = this,
			type = me.getClass(className);
		if(type) {
			 return type;
		}
		assert('ClassName must not empty! '+className, className);
		data.$className = className;
		if(!data.isMixin && data.init) {
			alert(className+', '+data.init);
			delete data.init;
		}		
		var modules = [],
			isSingleton = data.singleton,
			isMixin = data.isMixin,
			extend = data.extend,
			requires = data.requires,
			mixins = data.mixins,
			model = data.model;
		if(isString(extend)) {
			extend = (extend==className)? undefined : extend;
			if(extend) {
				modules.push(extend);
			}
		}
		if(isSingleton) {
		} else if(isMixin) {
			extend = extend||Mixin;
		} else {
			assert(className+' must extend a Class! '+extend, extend);
		}			
		if(requires) {
			modules = modules.concat(requires);
		}		
		if(mixins) {
			modules = modules.concat(mixins);
		}
		if(model) {
			modules.push(model);
		}
		modules = me._resolveRequireModule(modules);
		function defineFn() {
			if(isMixin) {
				return me._createMixin(extend, data);
			}
			if(extend) {
				if(!extend.extend) {
					extend = me.getClass(data.extend);
				}
				assert(className+' extend unknow class: '+data.extend, extend && extend.extend);
			}
			if(isSingleton && !extend) {
				type = data;
			} else {			
				if(extend.isMvcType) {
					var appModules = me._resolveMvcAppModule(data);
					if(appModules.length) {
						me.require(appModules);
					}
				}			
				if(model && !model.isModel) {
					data.model = me.getClass(data.model);
				}			
				if(mixins && mixins.length) {
					for(var i=0;i<mixins.length;i++) {
						mixins[i] = me.getClass(mixins[i]);					
					}
					var args = mixins.concat(data);
					type = extend.extend.apply(extend, args);
				} else {
					type = extend.extend(data);
				}
				if(data.singleton) {
					type = type.create();
				}
			}				
			_registerClass(type, data);
			if(isFunction(createFn)) {
				createFn.apply(type, arguments);
			}
			return type;
		}
		if(modules.length) {
			me.require(modules);
			_addLazyDefineFn(className, defineFn, modules);
		} else {
			type = defineFn();
		}		
		return type;
	},	
	_definePackage: function(ns, pkgName) {
		var me = this,
			nsName = ns.name,
			fnSuffix = pkgName.capitalize(),
			pkgPath = nsName+'.'+(pkgName? pkgName+'.' : pkgName);
		if(pkgName) {
			ns[pkgName] = ns[pkgName]||{};
		}		
		//define to{Package}(...)
		var toFnName = 'to'+fnSuffix;
		var toFn = ns[toFnName] = function(argName) {			
			if(isArray(argName)) {
				var results = [];
				for(var i=0;i<argName.length;i++) {
					results.push(toFn(argName[i]));					
				}				
				return results;
			}
			return (argName.indexOf(pkgPath)==0)? argName : pkgPath+argName;
		};
		//define define{Package}(...)
		var defineFnName = 'define'+fnSuffix;
		if(!pkgName && nsName==LIB) {
			defineFnName = 'defineNS';
		}
		ns[defineFnName] = function(argName, data, createFn) {
			argName = toFn(argName);
			return me.define.apply(me, arguments);
		};
	},	
	/**
	 * create a namespace
	 */
	createNamespace: function(name, packgs, nsPath) {
		var ns = _global[name]||Namespace.create();
		ns.name = name;
		if(nsPath) {
			ClassManager.registerNamespacePath(ns, nsPath);
		}		
		this._definePackage(ns, '');
		if(packgs) {
			if(isArray(packgs)) {
				for(var i=0;i<packgs.length;i++) {
					this._definePackage(ns, packgs[i]);
				}
			} else {
				for(var p in packgs) {
					this._definePackage(ns, p);
				}				
			}
		}
		_global[name] = ns;
		return ns;
	},
	create: function(className, config) {
		return ClassManager.create(className, config);
	},
	widget: createWidget,
	store: function(store, config) {
		if(store.isStore) {
			return store;
		}		
		return createStore(store, config);
	},
	initViewStore: function(ui) {
		var store = ui.store;
		store = ui.store = this.store(store);
		return store;
	},	
	createByAlias: createByAlias,
	setValue: function() {
		return Ember.set.apply(Ember, arguments);
	},
	/**
	 * create a mvc application
	 */
	createApp: function(appType, config, createFn) {
		var me = this,
			packgs = config&&config.packages||['model','store','view','controller'];
		if(!isString(appType)) {
			config = appType;
			appType = Zsember.to('app.Application');
		}
		var appName = appType.split('.')[0];
		appName = config.name||appName;
		var appPath = config.appPath||'./app';
		this.createNamespace(appName, packgs, appPath);
		var modules = [];
		if(isString(appType)) {
			modules.push(appType);
		}
		var controllers = config.controllers;
		if(controllers) {
			modules = modules.concat(controllers);
		}
		modules = me._resolveRequireModule(modules);
		me.require(modules, function() {
			me.onReady(function() {
				if(isString(appType)) {
					appType = me.getClass(appType);
				}
				me.onReady(function() {					
					var app = appType.create(config);
					return app;
				});
			});
		});
	}
});
Zsember.createNamespace(LIB, ['utils' ,'mixin', 'data', 'store', 'component','button',
    'window', 'form', 'grid', 'tree', 'app', 'desktop']);
Zsember.defineNS('Component', {
	extend: Widget,
	alias: 'widget.component'
});
Zsember.defineNS('tree.TreeView', {
	extend: 'Zsember.Component',
	isTree: true
});
_global.ZSEUI = Zsember;
var CoreModules = Zsember.to(['utils.HttpAjax', 'store.StoreUtils',
    'utils.Validations', 'utils.KeyboardUtils', 'utils.MouseUtils',
    'data.Model', 'data.TreeNode',
    'store.Store', 'component.Container', 'component.ListComponent']);
Zsember.require(CoreModules);
 

});