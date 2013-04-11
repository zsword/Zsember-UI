function initApp() {
	var modules = Zsember.to(['grid.Table']).concat(
		Shared.to(['store.data.Users']));
	Zsember.require(modules);
	Zsember.onReady(function() {
		var store = Zsember.store('sharedUsers', {
			pageSize: 5
		});		
		Zsember.widget('alinkBtn', {
			text: 'Reload Store',
			click: function() {
				store.reload();
			}
		}).append();
		Zsember.widget('alinkBtn', {
			text: 'Load Page',
			click: function() {
				store.loadPage();
			}		
		}).append();
		var dir = 'ASC';
		Zsember.widget('alinkBtn', {
			text: 'Sort Store',
			click: function() {
			dir = (dir=='ASC')? 'DESC' : dir;
			var sorters = [{
				'field': 'age',
				'dir': dir
				},{
					'field': 'name',
					'dir': (dir=='ASC')? 'DESC' : dir
				}];			
				store.sort(sorters);				
			}
		}).append();
		var storeInfo = Zsember.widget('table', {			
			store: store,
			columns: [{
				'text': '姓名',
				'field': 'name'
			}, {
				'text': '年龄',
				'field': 'age'
			}, {
				'text': '性别',
				'field': 'sex',
				'renderer': function(sex) {
					return sex==1? '女' : '男';
				}			
			}, {
				'text': '身高',
				'field': 'height',
				'renderer': function(height) {
					return height+' cm';
				}			
			}, {
				'text': '体重',
				'field': 'weight',
				'renderer': function(weight) {
					return weight+' kg';
				}
			}]
		}).append();		
	});
}