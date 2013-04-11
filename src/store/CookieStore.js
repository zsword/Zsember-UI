Zsember.defineNS('store.CookieStore', {
	extend: Zsember.to('store.Store'),
	alias: 'store.cookie',
	dataKey: undefined,
	dataExpires: undefined,
	getJson: function(key) {
		var ZE = Zsember,
			JsonUtils = ZE.JsonUtils,
			Cookies = ZE.Cookies;
		var data = Cookies.get(key);
		if(data) {
			data = unescape(data);
			data = JsonUtils.evalJson(data);
		}
		return data;
	},
	setJson: function(key, data) {
		var me = this,
			dataExpires = me.dataExpires,
			ZE = Zsember,
			JsonUtils = ZE.JsonUtils,
			Cookies = ZE.Cookies;
		if(data) {
			data = JsonUtils.toJson(data);	
		}
		Cookies.set(key, data, dataExpires);
		return data;
	},
	load: function(options) {
		var me = this,
			bufferData = undefined;
		var cfg = Zsember.apply({
			dataKey: me.dataKey
		}, options);
		var rootKey = cfg.dataKey;
		var info = me.getJson(rootKey);
		if(info) {
			var dataType = info.type;
			if(dataType=='array') {
				var length = info.length;
				bufferData = [];
				for(var i=0;i<length;i++) {
					var id = rootKey+'.'+i;
					var d = me.getJson(id);
					if(d) {
						bufferData.push(d);
					}
				}
			}
		}
		return me.handleLoadSuccess(bufferData);
	},
	save: function(records) {
		var me = this,
			data = me.data,
			dataKey = me.dataKey;
		if(Zsember.isArray(records)) {
			var info = {
				type: 'array',
				length: records.length
			};
			me.saveJson(dataKey, info);
			var reclen = records.length;
			var startIdx = data.length-reclen;
			for(var i=0;i<len;i++) {
				var idx = startIdx+i;
				var d = records[i];
				var id = d.id = d.id||(dataKey+'.'+idx);
				me.setJson(id, d);
			}
			return records;
		}
	}	
});