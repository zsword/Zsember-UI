Zsember.defineNS('tree.TreePanel', {
	extend: 'Zsember.Component',
	requires: Zsember.to(['toolbar.HeaderBar', 
	    'tree.Tree']),
	alias: 'widget.treepanel',
	classNames: 'v-panel',
	template: ['{{#if view.header}}{{view view.header}}{{/if}}<div class="panel-content">{{view view.treeView}}</div>'],
	fitView: true,
	initComponent: function() {
		var me = this;
		Zsember.initViewStore(me);
		me.initHeader();
		me.initTreeView();
		me.callSuper();
	},
	initHeader: function() {
		var me = this,
			header = me.header;
		header = Zsember.apply({
			widget: 'headerbar',
			parentViewBinds: ['title', 'iconCls', 'icon', 'collapsable', 'maximize', 'minimize', 'closable'],
			buttons: [{
				iconCls: 'icon-refresh',
				action: 'refresh'
			}]			
		}, header);
		me.header = Zsember.widget(header);
	},
	initTreeView: function() {
		var me = this,
			treeView = me.treeView,
			store = me.store;
		treeView = Zsember.apply({
			widget: 'tree',
			store: store 
		}, treeView);
		me.treeView = Zsember.widget(treeView);		
	},
	getCheckedValues: function() {
		var me = this,
			treeView = me.treeView;
		return treeView.getCheckedValues();
	},
	refresh: function() {
		var me = this,
			store = me.store;
		store.load();
		me.callSuper();
	}	
});