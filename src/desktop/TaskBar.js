/**
 * Desktop TaskBar Component
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.TaskBar
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.TaskBar', {
	extend: 'Zsember.Component',
	requires: Zsember.to(['desktop.StartMenu', 'desktop.DockBar']),
	alias: 'widget.desktopTaskbar',
	classNames: ['v-desktop-taskbar'],
	desktop: undefined,
	startMenus: undefined,	
	template: ['{{view view.startMenuView}}<div class="start-menu-button"></div>',
	    '<div class="bar-points"></div><div title="Show Desktop"></div>',
	    '{{view view.dockbar}}'],
	initComponent: function() {
		var me = this;
		me.dockbar = Zsember.widget('desktopDockbar');
		me.initStartMenu();
		me.callSuper();
	},
	initStartMenu: function() {
		var me = this,
			startMenus = me.startMenus;		
		var startMenuView = me.startMenuView = Zsember.widget('startMenu', {
			store: startMenus
		});
		me.addListeners({
			'click.startMenu': {
				handler: '.start-menu-button',
				fn: function() {
					startMenuView.toggle();
					return false;
				}
			}
		});	
		var desktop = me.desktop;
		if(desktop) {
			desktop.addListeners({
				'click.startMenu': function(event) {
					var target = event.target,
						className = target.className;
					if(className.indexOf('v-startmenu')!=-1 || className.indexOf('menu-items')!=-1) {
						return;
					}					
					startMenuView.hide();
				}
			});
		}
	},
	addDock: function(win) {
		var me = this,
			dockbar = me.dockbar;
		dockbar.addDock(win);
	}
});