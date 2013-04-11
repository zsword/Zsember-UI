Shared.defineModel('Menu', {
	extend: ZSEUI.to('data.Model'),
	fields: [{
		name: 'name',
		comment: '名称'
	},{
		name: 'iconCls',
		comment: '图标'
	},{
		name: 'action',
		comment: '动作'
	},{
		name: 'parent',
		comment: '上级菜单'
	},{
		name: 'children',
		comment: '子菜单'
	}]
});