AppCore.define('App', {
	extend: Zsember.toDesktop('App'),
	controllers: ['Desktop'],
	initApp: function() {
		var me = this;
		me.callSuper();
		Zsember.widget('alinkBtn', {
			'text': 'Refresh',
			click: function() {
				me.desktop.refresh();
			}
		}).appendTo('#heleBtns');		
	},
	loadDesktopCfg: function() {
		var desktopCfg = {
			shortcuts: 'appShortcuts',
			startMenus: 'appStartMenus'
		};
		return desktopCfg;
	}
});