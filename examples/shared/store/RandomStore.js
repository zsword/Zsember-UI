Shared.defineStore('RandomStore', {
	extend: ZSEUI.toStore('Store'),
	alwaysRandom: false,
	load: function() {
		var me = this;		
		if(!me.bufferData || me.alwaysRandom) {
			me.bufferData = me.randomData();
		}
		me.callSuper();
	},
	randomData: Zsember.EmptyFn
});