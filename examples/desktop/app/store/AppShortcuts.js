AppCore.defineStore('AppShortcuts', {
	extend: AppCore.toStore('LocalStorage'),
	model: AppCore.toModel('desktop.Shortcut'),
	singleton: true,
	dataKey: 'AppCore.Shortcuts',	
	alias: 'store.appShortcuts',
	autoLoad: true,
	load: function() {
		var me = this;
		me.callSuper();
		var data = me.bufferData;
		if(!data) {
			data = [{
				title: '快捷方式管理',
				widget: 'shortcutsMgr',
				module: 'grid-win',
				iconCls: 'shortcut'
			}];
			me.bufferData = data;
		}
	}
});