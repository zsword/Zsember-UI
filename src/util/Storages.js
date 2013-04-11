/**
 * Storages Module
 * @author JemiZhuu(周士淳,ZSword)
 * @version 0.1
 * @since 2013-4-11
 */
define(function(require, exports, module) {

var StorageUtils = {
	getStorage: function(type) {
		switch(type) {
		case 'local':
			return window.localStorage;
		case 'session':
			return window.sessionStorage;
		}
	},
	get: function(storageType, key) {
		var storage = this.getStorage(storageType);
		return storage.getItem(key);
	},	
	set: function(storageType, key, records) {
		if(records==undefined || records==null) {
			return this.remove(storageType, key);
		}		
		var storage = this.getStorage(storageType);		
		storage.setItem(key, records);
	},
	remove: function(storageType, key) {
		var storage = this.getStorage(storageType);
		storage.removeItem(key);
	}
};
exports.StorageUtils = StorageUtils;
	
});