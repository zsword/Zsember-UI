Shared.defineStore('LocalStorage', {
	extend: ZSEUI.toStore('StorageStore'),
	load: function() {
		var me = this;
		me.callSuper();
		var data = me.bufferData;
		if(!data) {
			data = me.randomData();
			alert('Random: '+data.length);
			me.bufferData = data;
			me.save();
			me.callSuper();
		}
	},
	randomData: ZSEUI.EmptyFn
});