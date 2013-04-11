/**
 * Desktop Shortcut Model
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.model.Shortcut
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.model.Shortcut', {
	extend: Zsember.to('data.Model'),
	fields: [{
		'name': 'title',
		'comment': '标题'
	},{
		'name': 'iconCls',
		'comment': '图标'
	},{
		'name': 'view',
		'comment': '视图'
	},{
		'name': 'module',
		'comment': '模块'
	}]
});