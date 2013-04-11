function initApp() {
	var modules = Zsember.to(['grid.CrudGrid', 'window.Window']).concat(
		Shared.to(['store.data.Users']));
		Zsember.require(modules);
		Zsember.onReady(function() {
			var store = Zsember.store('sharedUsers');
			var crudgrid = Zsember.widget('crudgrid', {
				store: store,
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
			var win = Zsember.widget('window', {
				'top': 100,
				'autoDestroy': false,
				'items': [crudgrid]
			});
			win.append();
		});	
}