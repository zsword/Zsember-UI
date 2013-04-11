AppCore.defineStore('AppStartMenus', {
	extend: AppCore.toStore('LocalStorage'),		
	model: AppCore.toModel('desktop.StartMenu'),
	dataKey: 'DesktopApp.StartMenus',
	singleton: true,
	alias: 'store.appStartMenus',
	autoLoad: true
});