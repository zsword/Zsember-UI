/**
 * Grid Panel
 * @author JemiZhuu(周士淳,ZSword)
 * @category grid.Grid
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('grid.Grid', {
	extend: 'Zsember.Component',
	requires: Zsember.to(['grid.Table', 'toolbar.PagerBar',
	    'selection.CheckboxModel']),
	alias: 'widget.grid',
	classNames: ['v-grid-panel'],
	/**
	 * @require
	 * @property - data store
	 */
	store: undefined,
	/**
	 * @require
	 * @property - columns configure
	 */
	columns: undefined,
	selModel: undefined, 
	template: ['{{_$view view.searchPanel}}{{_$view view.toolbar}}{{view view.tableView}}{{view view.pagerbar}}'],
	selModel: 'rowcls',
	initComponent: function() {
		var me = this,
			columns = me.columns,
			selModel = me.selModel;
		var store = Zsember.initViewStore(me);
		var table = me.tableView = Zsember.widget('gridtable', {
			store: store,
			columns: columns,
			selModel: selModel
		});
		me.pagerbar = Zsember.widget('pagerbar', {
			store: store
		});
		selModel = me.selModel = table.selModel;
		me.callSuper();
	},
	onResize: function() {
		var me = this,
			tableView = me.tableView;
		tableView.onResize();
	}
});