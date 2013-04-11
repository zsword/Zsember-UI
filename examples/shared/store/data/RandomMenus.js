Shared.defineStore('data.RandoMenus', {
	extend: Shared.toStore('RandomStore'),
	model: Shared.toModel('Menu'),
	isTree: true,
	singleton: true,
	alias: 'store.sharedRandomMenus',
	dataKey: 'Shared.Users',
	autoLoad: true,
	/**
	 * @override
	 */
	randomData: function() {
		var me = this;
		var root = {
			id: 'm-0',
			text: 'Root-'+new Date().toLocaleString()
		};
		root = me._buildMenuNode(root);
		return root;
	},
	_buildMenuNode: function(node, lv, maxLv) {
		var me = this,
			RandomData = Zsember.RandomDataUtils;
		lv = lv||0;
		if(lv>=maxLv) {
			return node;
		}
		lv++;
		var children = [],
			parentId = node.id;
		var childCount = RandomData.randomInt(6, 3);
		var names = RandomData.randomNames(childCount);
		for(var i=0;i<childCount;i++) {
			var child = {
				id: parentId+'-'+i,
				text: names[i],
				'parentId': parentId
			};
			if(lv==1) {
				maxLv = RandomData.randomInt(3)||3;
			}
			me._buildMenuNode(child, lv, maxLv);
			children.push(child);
		}
		node.children = children;
		return node;
	}
});