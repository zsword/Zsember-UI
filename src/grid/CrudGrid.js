/**
 * Model CRUD Grid
 * @author JemiZhuu(周士淳,ZSword)
 * @category grid.CrudGrid
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('grid.CrudGrid', {
	extend: Zsember.to('grid.Grid'),
	requires: Zsember.to(['form.SearchForm']),
	alias: 'widget.crudgrid',
	classNames: 'v-crudgrid-panel',
	editor: undefined,
	selModel: {
		type: 'checkbox',
		model: 'MULTI'
	},
	initComponent: function() {
		var me = this;
		Zsember.initViewStore(me);
		me.buildSearchPanel();
		me.buildToolbar();
		me.callSuper();
		me.selModel.on('selectionChange', me, me.onSelectionChange);
	},
	buildSearchPanel: function() {
		var me = this,
			searchPanel = me.searchPanel;			
		searchPanel = Zsember.apply({
			widget: 'searchForm',
			store: me.store,
			title: me.title,
			collapsed: true
		}, searchPanel);
		searchPanel = Zsember.widget(searchPanel);
		me.searchPanel = searchPanel;
	},
	buildToolbar: function() {
		var me = this,
			toolbar = me.toolbar;
		toolbar = Zsember.apply({
			widget: 'buttonbar',
			buttons:[{
				text: '添加',
				rel: 'addData'
			},{
				text: '修改',
				rel: 'editData'
			},{
				text: '删除',
				rel: 'removeData'
			}]
		}, toolbar);
		toolbar = me.toolbar = Zsember.widget(toolbar);
	},
	getSelection: function() {
		return this.selModel.getSelection();
	},	
	onSelectionChange: function() {
		var me = this,
			editor = me.editor;
		if(editor && editor.isVisible && editor.isVisible()) {
			me.editData();
		}		
	},	
	addData: function() {
		this.editData({});
	},	
	editData: function(data) {
		var me = this,
			editor = me.editor||{};
		if(!data) {
			var selections = me.getSelection();
			data = selections[selections.length-1];
			if(!data) {
				alert('Please select one record to edit!');
				return;
			}			
		}		
		if(!editor.isView) {
			editor = Zsember.apply({
				widget:'modelForm',
				data: data,
				store: me.store,
				title: me.title
			}, editor);
			editor = me.editor = Zsember.widget(editor); 
			me.toolbar.addItem(editor);
		} else {
			editor.bindData(data);
		}
	},
	removeData: function(data) {
		var me = this;			
		if(!data) {
			data = me.getSelection();
			if(!data.length) {
				data = undefined;			
			}			
		}
		if(!data) {
			alert('Please select record to remove!');
			return;			
		}
		var store = me.store;
		store.remove(data);
	}
});