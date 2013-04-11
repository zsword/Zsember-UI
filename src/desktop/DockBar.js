/**
 * Desktop DockBar
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.DockBar
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.DockBar', {
	extend: Zsember.to('component.Container'),
	requires: Zsember.to(['desktop.TaskDock']),
	alias: 'widget.desktopDockbar',
	classNames: 'v-desktop-dockbar',
	addDock: function(win) {
		var dock = Zsember.widget('taskdock', {
			window: win
		});
		this.addItem(dock);
	}
});