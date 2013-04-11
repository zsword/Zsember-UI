/**
 * Desktop Shortcut Component
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.Shortcut
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.Shortcut', {
	extend: 'Zsember.Component',
	alias: 'widget.shortcut',
	classNames: ['v-shortcut'],
	data: undefined,
	template: ['<span {{bindAttr class=":x-icon view.data.iconCls"}}></span>',
	    '<div class="text">{{view.data.title}}</div>'],
	initComponent: function() {
		var me = this,
			data = me.data;
		me.addListeners({
			'click.shortcuts': Zsember.proxyFn(me.click, me, data)
		});
		me.callSuper();
	},
	onFirstRender: function() {
		var me = this,
			data = me.data,
			view = me.getView(),
			$icon = view.children('.x-icon');
		if(!data.icon) {
			var iconCss = $icon.css('backgroundImage');
			iconCss = iconCss.replace(/url\(['"]?([^'"\(\)]+)['"]?\).*/g, '$1');
			data.icon = iconCss;			
		}		
		me.callSuper();
	},	
	click: Zsember.EmptyFn
});