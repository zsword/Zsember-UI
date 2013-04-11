/**
 * Desktop Component
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.Desktop
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.Desktop', {
	extend: 'Zsember.Component',
	requires: Zsember.to(['window.Window',
	    'desktop.TaskBar', 'desktop.ShortcutsView',	'desktop.WallPaper',
	    'desktop.module.GridWindow', 'desktop.module.IframeWindow']),
	alias: 'widget.desktop',
	classNames: ['v-desktop'],
	container: undefined,
	shortcuts: undefined,
	startMenus: undefined,
	template: '{{view view.desktop}}{{view view.taskbar}}{{view view.wallpaper}}',
	initComponent: function() {
		var me = this,				
			items = me.items = me.items||[],
			container = me.container = me.container||'body';
		me.initModules();
		me.initDesktop();
		me.initTaskbar();
		me.wallpaper = Zsember.widget({
			widget: 'desktopWallPaper'
		});
		me.appendTo(container);
		me.callSuper();
	},	
	modules: ['windowModule',
		'gridWindow',
		'iframeWindow'
	],
	desktopModules: {},
	initModules: function() {
		var me = this,
			desktopModules = me.desktopModules,
			modules = me.modules;
		for(var i=0;i<modules.length;i++) {
			var mod = modules[i];
			mod = Zsember.widget(mod);
			modules[i] = mod;			
			desktopModules[mod.id] = mod;
		}
	},
	initDesktop: function() {
		var me = this;
		me.configDesktop();
		var shortcuts = me.shortcuts;
		shortcuts = me.shortcuts = Zsember.store(shortcuts);
		var container = me.container;
		$(container).on('contextmenu', Zsember.FalseFn);
		me.desktop = Zsember.widget('container', {
			classNames: 'v-desktop-container',
			items: [{
				widget: 'shortcutsView',
				desktop: me.desktop,
				shortcuts: shortcuts,
				onShortcutClick: Zsember.proxyFn(me.onShortcutClick, me)				
			}]
		});		
	},
	initTaskbar: function() {
		var me = this;
		me.configTaskbar();
		var startMenus = me.startMenus;
		if(startMenus) {
			if(!startMenus.isStore) {
				startMenus = me.startMenus = Zsember.store(startMenus);
			}
		}
		me.taskbar = Zsember.widget({
			widget: 'desktopTaskbar',
			startMenus: startMenus,
			desktop: me
		});
	},
	onShortcutClick: function(shortcut) {
		var view = shortcut;
		this.createWindow(view);
	},
	createDesktopWindow: function(win) {
		var me = this;
		if(!win.isView) {
			win = Zsember.widget(win);
		}
		me.desktop.addItem(win);
	},
	_windows:{},
	createWindow: function(winCfg) {
		var me = this,
			sysModules = me.desktopModules,
			modId = winCfg.module,
			windows = me._windows,
			winId = winCfg.id||'#'+winCfg.view;
		var win = windows[winId];
		if(!win || win.isDestroyed) {
			var module = sysModules[modId];
			if(module) {
				win = module.createView(winCfg);				
			} else {
				win = Zsember.widget(winCfg);
			}
			me.taskbar.addDock(win);
			windows[winId] = win;
			me.createDesktopWindow(win);
		} else {
			win.show();
		}
	},
	configDesktop: Zsember.EmptyFn,
	configTaskbar: Zsember.EmptyFn,
	refresh: function() {
		var me = this,
			shortcuts = me.shortcuts,
			startMenus = me.startMenus;
		shortcuts.load();
		if(startMenus) {
			startMenus.load();
		}
		me.callSuper();
	}
});