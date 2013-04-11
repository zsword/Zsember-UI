/**
 * Extend Template Module(for Handlebars)
 * @author JemiZhuu(周士淳,ZSword)
 * @version 0.1
 * @since 2013-4-11
 */
define(function(require, exports, module) {
	
var STYLE_BIND = 'STYLE-BIND';
var StyleGenID = 0;
var StyleBindMap = {};
var TplHelper = Handlebars;
function toSafeString(text) {
	return new TplHelper.SafeString(text);
}
exports.renderTplHtml = toSafeString;
TplHelper.registerHelper('_$outField', function(data, field, options) {
	if(arguments.length<3) {
		options = field;
		field = this;
	}
	var prop = field.field;
	var renderer = field.renderer; 
	var value = data[prop];
	if(renderer) {
		value = renderer(value, data);
		value = toSafeString(value);
	}
	return value;
});
TplHelper.registerHelper('out', function(data, prop, options) {
	if(arguments.length<3) {
		prop = data;
		options = prop;
		data = this;
	}
	return toSafeString('<a>'+data[prop]+'</a>');
});
TplHelper.registerHelper('_$style', function(styles, options) {
	if(arguments.length<2) {
		options = styles;
		styles = "";
	}
	var result = [],
		hash = options.hash,
		data = this;	
	var binds = hash.binds;
	if(binds) {
		binds = binds.toLowerCase();	
		var bindCfg = data._styleBindCfg,
			bindId, cfgBinds;
		if(bindCfg) {
			bindId = bindCfg.bindId;
			cfgBinds = bindCfg.binds;
		} else {
			bindId = StyleGenID++;			
			var bindCfg = {'bindId': bindId};
			data._styleBindCfg = StyleBindMap[bindId] = bindCfg;
			cfgBinds = bindCfg.binds = [];
			data.set = function(prop, val) {
				var oldVal = this[prop];
				if(oldVal===val) {
					//return alert(data+'='+val);					
				}
				this[prop] = val;
				bindFn(prop, val);
			};
			var bindFn = function(prop, val) {
				var views = bindCfg[prop].views;
				var $views = $(views),
					propFn = $views[prop];
				/*if(propFn) {
					propFn.call($views, val);
				} else*/ {
					$views.css(prop, val);
				}
			};
		}
		var nextId = cfgBinds.indexOf(binds);
		if(nextId==-1) {
			nextId = cfgBinds.length;
			cfgBinds.push(binds);
		}
		var bindArr = binds.split(',');
		for(var i=0;i<bindArr.length;i++) {
			var b = bindArr[i];
			var val = data[b];
			if(val) {				
				if(/width|height|left|top/g.test(b)===true) {					
					val = val+'px';					
				}
				styles = styles+b+':'+val+';';
			}
		}
		var styleBindId = bindId+'-'+nextId;
		result.push(STYLE_BIND+'='+styleBindId);		
	}
	if(styles) {
		result.push('style='+styles);
	}
	return result.join(' ');
});
function _processStyleBinds(bindViews) {
	var allBinds = {};
	var allCfgs = {};
	bindViews.each(function(idx, view) {
		$view = $(view);
		var bindId = $view.attr(STYLE_BIND);
		$view.removeAttr(STYLE_BIND);
		var binds = allBinds[bindId],
			bindCfg =  allCfgs[bindId];
		if(!binds) {
			var ids = bindId.split('-');
			bindCfg = allCfgs[bindId] = StyleBindMap[ids[0]];
			binds = allBinds[bindId] = bindCfg.binds[ids[1]];
		}
		binds = binds.split(',');
		for(var i=0;i<binds.length;i++) {
			var p = binds[i];
			var styleCfg = bindCfg[p] = bindCfg[p]||{};
			var cfgViews = styleCfg.views = styleCfg.views||[];
			if(cfgViews.length>10) {
				cfgViews = styleCfg.views = $(cfgViews).filter(':visible').get();
			}
			cfgViews.push(view);
		}
	});
}
function processTplViewBinds(view) {
	var styleBindViews = view.find('['+STYLE_BIND+']');
	_processStyleBinds(styleBindViews);
}
exports.processTplViewBinds = processTplViewBinds;
function safeHtml(text) {
	return new Handlebars.SafeString(text);
}
TplHelper.registerHelper('safeStr', function(text) {
	if(!text) {
		return undefined;
	}
	return safeHtml(text);
});
TplHelper.registerHelper('test', function(condition, trueResult, falseResult, options) {
	if(arguments.length<4) {
		falseResult = undefined;
	}
	return condition? trueResult : falseResult;	
});
TplHelper.registerHelper('field', function(data, field, options) {
	if(arguments.length<3) {
		options = field;
		field = this;
	}
	field = field||this;
	var renderer = field.renderer;
	var property = field.field;	
	var value = data[property];
	if(renderer) {
		value = safeHtml(renderer(value, data));
	}	
	return value;
});
var EmberTpl = Ember.Handlebars;
function _ResolveAttrKey(attr, options) {
	if(!/.*(\[.+\])/.test(attr)) {
		return attr;
	}
	var key = attr.replace(/.*\[(.+)\]/, '$1');
	var val = EmberTpl.get(this, key, options);	
	if(val!=undefined) {
		return val;
	}
	return 'this';
}
EmberTpl.registerHelper('_$bind', function(attr, options) {
	if(arguments.length<2) {
		options = attr;
		var attrs = options.hash;	
		if(attrs) {
			for(var f in attrs) {
				var val = attrs[f];
				attrs[f] = _ResolveAttrKey.call(this, val, options);
			}
		}		
		return EmberTpl.helpers.bindAttr.apply(this, arguments);
	} else {
		attr = _ResolveAttrKey.call(this, attr, options);
		return EmberTpl.helpers.bind.apply(this, arguments);
	}	
});
EmberTpl.registerHelper('_$view', function(path, options) {	
	var view = EmberTpl.get(this, path, options);
	if(!view) {
		return null;
	}
	return EmberTpl.helpers.view.apply(this, arguments);	
});
var Templates = require('./ExtTemplates');
for(var v in Templates) {
	exports[v] = Templates[v];
}
	
});