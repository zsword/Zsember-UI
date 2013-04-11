/**
 * Storage Store
 * @author JemiZhuu(周士淳,ZSword)
 * @category store.StorageStore
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('store.StorageStore', {
	extend: Zsember.to('store.Store'),
	alias: 'store.storage',
	storage: 'local',
	dataKey: undefined,
	load: function() {
		var me = this,
			data = me.bufferData;
		if(!data) {
			var dataKey = me.dataKey;
			if(!dataKey) {
				throw new Error('StorageStore dataKey is required!'+dataKey);
			}
			data = me._getData(dataKey);					
		}
		me.bufferData = data;
		me.callSuper();
	},
	saveRecords: function(records) {
		var me = this;
		me.callSuper(records);
		var data = me.bufferData,
			dataKey = me.dataKey;
		me._setData(dataKey, data);
	},
	removeRecords: function(records) {
		var me = this;
		me.callSuper(records);
		var data = me.bufferData,
			dataKey = me.dataKey;
		me._setData(dataKey, data);		
	},
	_setData: function(dataKey, data) {
		var me = this,
			StorageUtils = Zsember.StorageUtils,
			JsonUtils = Zsember.JsonUtils;
		if(data!=undefined && data!=null) {
			data = JsonUtils.toJson(data);
		}
		StorageUtils.set(me.storage, dataKey, data);			
		return data;		
	},
	_getData: function(dataKey) {
		var me = this,
			StorageUtils = Zsember.StorageUtils,
			JsonUtils = Zsember.JsonUtils;
		var data = StorageUtils.get(me.storage, dataKey);
		if(data) {
			try {
				data = JsonUtils.evalJson(data);
			} catch(e) {
				alert(e+'\nJSON:'+data);
				data = undefined;
			}
		}
		return data;
	}
});