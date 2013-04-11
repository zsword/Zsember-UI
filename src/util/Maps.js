/**
 * Maps Module
 * @author JemiZhuu(周士淳,ZSword)
 * @version 0.1
 * @since 2013-4-11
 */
define(function(require, exports, module) {

var apply = $.extend;
var IndexMap = function(data) {
	this._map = {};
	this._keys = [];
	if(data) {
		if(isArray(data)) {
			for(var i=0;i<data.length;i++) {
				this.set(i, data[i]);
			}				
		} else {
			for(var p in data) {
				this.set(p, data[p]);
			}				
		}			
	}
};
apply(IndexMap.prototype, {
	_map: undefined,
	_keys: undefined,
	set: function(key, value) {
		this._map[key] = value;
		if(!this.contains(key)) {
			this._keys.push(key);
		}		
	},
	get: function(key) {
		return this._map[key];
	},
	contains: function(key) {
		return this._keys.contains(key);
	},
	remove: function(key) {
		var value = this._map[key],
			keys = this._keys;
		if(!value) {
			return value;
		}				
		delete this._map[key];
		var index = keys.indexOf(key);
		if(index!=-1) {
			keys.splice(index, 1);			
		}
		debugLog('k: '+key, value, keys);
		return value;
	},
	popKey: function() {
		return this._keys.pop();
	},
	pop: function() {
		var keys = this._keys;
		var k = keys.pop();
		var value = this._map[k];
		delete this._map[k];			
		return value;
	},
	getKeys: function() {
		return this._keys;
	},
	size: function() {
		return this._keys.length;
	}
});
exports.IndexMap = IndexMap;

});