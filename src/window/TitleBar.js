/**
 * Window TitleBar
 * @author JemiZhuu(周士淳,ZSword)
 * @category window.TitleBar
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('window.TitleBar', {
	extend: 'Zsember.Component',
	alias: 'widget.windowTitlebar',
	classNames: ['v-win-titlebar', 'x-unselectable'],
	title: undefined,
	maximize: true,
	minimize: true,
	closable: true,
	MaxText: 'Maximize',
	MinText: 'Minimize',
	RestoreText: 'Restore',
	CloseText: 'Close',
	template:['{{_$view view.header}}<div class="title"><img {{bindAttr class=":x-icon view.iconCls" src="view.icon"}} /><span class="title-text">{{view.title}}</span></div>',
	    '<div class="buttons"><div class="win-btn-leftedge"></div>',
	    '{{#if view.minimize}}<a class="win-btn win-min-btn" rel="min" href="#" {{bindAttr title="view.MinText"}}></a><div class="win-btn-spacer"></div>{{/if}}',
	    '{{#if view.maximize}}<a class="win-btn win-max-btn" rel="max" href="#" {{bindAttr title="view.MaxText"}}></a><div class="win-btn-spacer"></div>',
	    '{{else}}<a class="win-btn win-reg-btn" rel="restore" href="#" {{bindAttr title="view.RestoreText"}}></a><div class="win-btn win-btn-spacer"></div>{{/if}}',
	    '{{#if view.closable}}<a class="win-btn win-close-btn" rel="close" href="#" {{bindAttr title="view.CloseText"}}></a><div class="win-btn-rightedge"></div>{{/if}}</div>'],
	initComponent: function() {
		var me = this;
		me.addListeners({
			'click.buttons': {	
				'handler': '.win-btn',
				'fn': function(event) {
					var me = this,
							btn = event.currentTarget,
							action = btn.rel;
					me.onButtonClick(btn, action);
					return false;
				}
			}
		});
		me.callSuper();
	},
	onButtonClick: Zsember.EmptyFn
});