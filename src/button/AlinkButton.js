/**
 * Link Button
 * @author JemiZhuu(周士淳,ZSword)
 * @category button.AlinkButton
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('button.AlinkButton', {
	extend: 'Zsember.Component',
	alias: 'widget.alinkBtn',
	tagName: 'a',
	classNames: 'v-button button-gray',
	attributeBindings: ['href', 'target'],
	href: undefined,
	text: undefined,
	target: undefined,
	template: ['<span class="btn-left"></span>',
	    '<span class="btn-body">{{view.text}}</span>',
	    '<span class="btn-right"></span>'],
	initComponent: function() {
		var me = this;
			listeners = me.listeners = me.listeners||{};
		Zsember.apply(listeners, {
			'click': me.click
		});
		me.callSuper();
	}
});