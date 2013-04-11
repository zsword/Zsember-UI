/**
 * Desktop TaskDock Component
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.TaskDock
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.TaskDock', {
	extend: 'Zsember.Component',
	alias: 'widget.taskdock',
	classNames: 'v-task-dock',
	attributeBindings: ['title'],
	titleBinding: 'window.title',
	window: undefined,
	template: ['<img class="taskdock-icon" {{bindAttr src="view.window.icon"}}></img></div>'],
	initComponent: function() {
		var me = this,
			window = me.window;
		window.on('willDestroyElement', function() {
			me.destroy();
		});
		me.addListeners({
			'click.active': function() {
				me.window.toggle();
				return false;
			}
		});
		me.callSuper();
	}
});