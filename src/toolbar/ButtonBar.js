/**
 * ButtonBar
 * @author JemiZhuu(周士淳,ZSword)
 * @category toolbar.ButtonBar
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('toolbar.ButtonBar', {
	extend: Zsember.to('component.Container'),
	requires: Zsember.to(['button.IconButton']),
	alias: 'widget.buttonbar',
	classNames: 'v-button-bar',
	buttons: undefined,
	initComponent: function() {
		var me = this;
		me.buildButtons();
		me.addListeners({
			'click.buttons': {
				handler: '.v-button',
				fn: function(event) {
					var btn = event.currentTarget,
						action = btn.rel,
						toTarget = me.container||me.getParentView()||me;
					if(action) {
						toTarget.fireEvent(action);
						return false;
					}
				}			
			}			
		});
		me.callSuper();
	},
	buildButtons: function() {
		var me = this,
			buttons = me.buttons;
		if(!buttons) {
			return buttons;
		}
		for(var i=0;i<buttons.length;i++) {
			var btn = buttons[i];
			btn = Zsember.apply({
				widget: 'iconButton'
			}, btn);
			me.addItem(btn);
		}		
	}
});