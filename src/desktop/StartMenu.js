/**
 * Desktop StartMenu Component
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.StartMenu
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.StartMenu', {
	extend: 'Zsember.Component',
	classNames: 'v-startmenu',
	alias: 'widget.startMenu',
	template: ['<ul class="menu-items">{{#each view.store.data}}',
	    '<li class="menu-item"><a {{bindAttr rel="module" rev="this.view" href="action"}}><img {{bindAttr class=":menu-icon iconCls" src="icon"}} /><span>{{title}}</span></a></li>',
	    '{{/each}}</ul><div style="position: absolute; left: 300px; top: 50px;">',
	    '<iframe scrolling="no" frameborder="0" style="overflow:hidden;width:100px;height:65px;" src="http://www.facebook.com"></iframe>',
	    '</div>'],
	initComponent: function() {
		var me = this;
		me.initMenus();
		me.callSuper();
	},
	initMenus: function() {
		var me = this,
			store = me.store;
		if(!store) {
			return;
		}
		if(!store.isStore) {
			store = me.store = Zsember.store(store);
		}
		store.on('load', me, me.bindMenus);
		var menus = store.data;
		if(!menus) {
			store.load();
		}
		me.bindMenus(menus);
	},
	bindMenus: function(menus) {
		var me = this;
		//me.set('menus', menus);
	}
});