AppCore.defineStore('desktop.Shortcuts', {
	extend: AppCore.toStore('LocalStorage'),
	model: AppCore.toModel('desktop.Shortcut'),
	singleton: true,
	dataKey: 'AppCore.Shortcuts',
	alias: 'store.mgrShortcuts',
	pageSize: 10,
	autoLoad: true
});