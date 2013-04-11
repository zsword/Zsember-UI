AppCore.defineModel('desktop.StartMenu', {
	extend: ZSEUI.to('data.Model'),
	fields: [{
		'name': 'title',
		'comment': '标题',
		filterType: 'LIKE'
	},{
		'name': 'iconCls',
		'comment': '图标',
		filter: false
	},{
		'name': 'url',
		'comment': '链接'		
	},{
		'name': 'view',
		'comment': '视图'
	},{
		'name': 'module',
		'comment': '模块',
		editor: {
			xtype: 'desktopModuleSel'
		}
	},{
		'name': 'orderNo',
		'comment': '排序',
		type: 'number'
	}]
});