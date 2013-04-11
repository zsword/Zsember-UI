Shared.defineStore('data.Users', {
	extend: Shared.toStore('LocalStorage'),
	model: Shared.toModel('User'),
	singleton: true,
	alias: 'store.sharedUsers',
	dataKey: 'Shared.Users',
	autoLoad: true,
	pageSize: 10,
	/**
	 * @override
	 */
	randomData: function() {
		var me = this,
			total = me.totalItems||48,
			RandomUtils = Zsember.RandomDataUtils,
			data = [];
		var names = RandomUtils.randomNames(total);
		for(var i=0;i<names.length;i++) {
			var u = {
				name: names[i],
				age: RandomUtils.randomInt(60, 18),
				sex: RandomUtils.randomInt(2),
				height: RandomUtils.randomInt(210, 140),
				weight: RandomUtils.randomFloat(100, 50, 2)
			};
			data.push(u);
		}		
		return data;
	}
});