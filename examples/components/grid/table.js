function initApp() {
	var modules = Zsember.to(['grid.Table']).concat(
		Shared.to(['store.data.Users']));
	Zsember.require(modules);	
	Zsember.onReady(function() {
		Zsember.widget('alinkBtn', {
			text: 'Change Data',
			click: function() {
				var ui = table,
					store = ui.store,
					data = store.data;
				data[0].set('name', 'ABC');
			}
		}).appendTo('#buttonDiv');
		var dir = 'ASC';
		Zsember.widget('alinkBtn', {
			text: 'Sort Store',
			click: function() {
				dir = (dir=='ASC')? 'DESC' : 'ASC';
				var sorters = [{
					'field': 'age',
					'dir': dir
				},{
					'field': 'name',
					'dir': (dir=='ASC')? 'DESC' : dir
				}];			
				store.sort(sorters);				
			}
		}).appendTo('#buttonDiv');		
		var store = Zsember.store('sharedUsers');
		var table = Zsember.widget('gridtable', {
			'store': store,
			columns: [{
				'text': '姓名',
				'field': 'name'
			}, {
				'text': '年龄',
				'field': 'age'
			}, {
				'text': '性别',
				'field': 'sex'
			}, {
				'text': '身高',
				'field': 'height'
			}, {
				'text': '体重',
				'field': 'weight'
			}, {
				'text': 'Temp0',
				'field': 'temp0'
			}, {
				'text': 'Temp1',
				'field': 'temp1'
			}, {
				'text': 'Temp2',
				'field': 'temp2'
			}]			
		});		
		table.appendTo('#tableDiv');
	});
}