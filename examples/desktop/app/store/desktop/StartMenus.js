AppCore.defineStore('desktop.StartMenus', {
	extend: AppCore.toStore('LocalStorage'),		
	model: AppCore.toModel('desktop.StartMenu'),
	dataKey: 'DesktopApp.StartMenus',
	singleton: true,
	alias: 'store.mgrStartMenus',
	pageSize: 10,
	autoLoad: true
});