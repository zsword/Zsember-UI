/**
 * Icon Button
 * @author JemiZhuu(周士淳,ZSword)
 * @category button.IconButton
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('button.IconButton', {
	extend: 'Zsember.Component',
	alias: 'widget.iconButton',
	classNames: 'v-button button-gray',
	attributeBindings: ['type', 'title', 'href', 'rel'],
	text: undefined,
	title: undefined,
	iconCls: undefined,
	href: undefined,
	rel: undefined,
	type: undefined,
	template: '<span class="btn-left"></span><span>{{view.text}}</span><span class="btn-right"></span>',
	initComponent: function() {
		var me = this,
			type = me.type;			
		if(type) {
			me.tagName = 'button';
		} else if(me.href || me.rel) {
			me.tagName = 'a';
		}		
		me.callSuper();
	}

});