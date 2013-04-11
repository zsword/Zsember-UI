AppCore.defineView('desktop.StartMenus', {
	extend: ZSEUI.to('grid.CrudGrid'),
	alias: 'widget.startMenusMgr',
	store: 'mgrStartMenus',
	columns: [{
		'text': '标题',
		'field': 'title'
	},{
		'text': '图标',
		'field': 'iconCls'
	},{
		'text': '视图',
		'field': 'view'
	},{
		'text': '模块',
		'field': 'module'
	},{
		'text': '排序',
		field: 'orderNo'
	}]	
});