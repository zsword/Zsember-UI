/**
 * StoreBindable Mixin
 * @author JemiZhuu(周士淳,ZSword)
 * @category mixin.StoreBindable
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('mixin.StoreBindable', {
	isMixin: true,
	store: undefined,
	init: function() {
		var me = this;		
		me.bindStore();
		me.callSuper();
	},
	bindStore: function(store) {
		var me = this;
		store = store||me.store;
		if(!store.isStore) {
			store = Zsember.store(store);
		}
		var refreshFn = function() {
			if(me.isDestroyed || !me.isVisible()) {
				store.off('refresh', refreshFn);
				return;
			}
			me.onDataRefresh();
		};		
		store.on('refresh', refreshFn);
	},
	onDataRefresh: function() {
		this.refresh();
	}	
});