AppCore.defineController('Desktop', {
	extend: Zsember.to('app.Controller'),
	stores: ['AppShortcuts', 'AppStartMenus',
	    'desktop.Shortcuts', 'desktop.StartMenus'],
	views: ['desktop.ModuleSelect', 'desktop.IconClsSelect', 'desktop.Shortcuts', 
	    'desktop.StartMenus', 'desktop.MyComputer', 'desktop.MyDocument']
});