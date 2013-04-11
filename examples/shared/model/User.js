/**
 * @Model - User
 * @Namespace - Shared
 */
Shared.define('model.User', {
	extend: Zsember.to('data.Model'),
	fields: [{
	    'name': 'name',
	    'comment': '姓名'
	},{	   
	    'name': 'age',
	    'type': 'number',
	    'comment': '年龄'
	},{
		'name': 'sex',
		'comment': '性别',
		editor: {
			xtype: 'selectfield',
			content: [['男',0],['女',1]]
		}
	},{
		'name': 'height',
		'type': 'number',
		'comment': '身高'
	},{
		'name': 'weight',
		'type': 'number',
		'comment': '体重'
	}]
});