AppCore.defineController('Desktop', {
	extend: Zsember.to('app.Controller'),
	stores: ['AppShortcuts', 'AppStartMenus',
	    'desktop.Shortcuts', 'desktop.StartMenus'],
	views: ['desktop.ModuleSelect', 'desktop.Shortcuts', 'desktop.StartMenus']
});