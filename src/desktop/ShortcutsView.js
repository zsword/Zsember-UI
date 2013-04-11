/**
 * Desktop Shortcuts Component
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.ShortcutsView
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.ShortcutsView', {
	extend: Zsember.to('component.Container'),
	requires: Zsember.to(['desktop.Shortcut']),
	alias: 'widget.shortcutsView',
	classNames: ['v-shortcuts-view'],
	/**
	 * @cfg - array
	 * @options - shortcuts data
	 */
	shortcuts: undefined,
	/**
	 * @cfg - data store
	 * @option - shortcuts data store
	 * if no shortcuts data configured using store to load data 
	 */
	store: undefined,
	boxHeight: undefined,
	desktop: undefined,
	initComponent: function() {
		var me = this;
		me.initShortcuts();
		me.callSuper();
	},
	initShortcuts: function() {
		var me = this,
			data = me.shortcuts;
		if(!Zsember.isArray(data)) {
			var store = me.store||data;
			if(!store) {
				throw new Error('Shortcuts Store must config!'+store);
			}
			if(!store.isStore) {
				store = Zsember.store(store);
			}
			me.store = store;
			if(!me._bindedStore) {
				store.on('load', function() {
					data = store.data;
					me.setData(data);
				});
				me._bindedStore = store;
			}
			data = store.data;
			if(!data) {
				return store.load();
			}
		}
		if(data) {			
			me.setData(data);
		}
	},
	onShortcutClick: Zsember.EmptyFn,
	setShortcuts: function(data) {
		var me = this;
		for(var i=0;i<data.length;i++) {
			var d = data[i];
			var shortcut = {
			    'widget': 'shortcut',
				data: d,
				'click': me.onShortcutClick	
			};
			shortcut = me.addItem(shortcut);
		}		
	},
	createBox: function(cfg) {
		var me = this;
		cfg = Zsember.apply({
			_isBox: true,
			onShortcutClick: me.onShortcutClick,
			widget: 'shortcutsView'
		}, cfg);
		var scBox = Zsember.widget(cfg);
		this.addItem(scBox);
		return scBox;
	},
	onFirstRender: function() {
		var me = this,
			store = me.store,
			data = store? store.data:me.shortcuts;
		me.setData(data);
		me.callSuper();
	},
	setData: function(data) {
		if(!data) {
			return;
		}
		if(!this.getView()) {
			return;
		}		
		var me = this,
			height = me.boxHeight,
			scHeight = 80;
		if(!height) {
			var container = me.desktop||me.getParentView()||me;
			var scView = container.getView();
			height = scView.height();
		}
		if((data.length*scHeight)<=height) {			
			me.setShortcuts(data);
			return;
		}
		var scBox,			
			boxCount = 0,
			boxHeight = 0,
			i=0;
		var scData = [];
		while(i<data.length) {
			var d = data[i++];
			boxHeight+=scHeight;			
			if(boxHeight>height) {
				var listViews = me.getChildViews();
				scBox = listViews[boxCount++];
				if(!scBox) {
					scBox = me.createBox({
						boxHeight: height,
						shortcuts: scData
					});
				}
				scData = [];
				boxHeight = scHeight;
			}			
			scData.push(d);
		}
		if(scData.length) {
			var listViews = me.getChildViews();
			scBox = listViews[boxCount++];
			if(!scBox) {
				scBox = me.createBox({
					boxHeight: height,
					shortcuts: scData
				});		
			}
		}
	}	
});