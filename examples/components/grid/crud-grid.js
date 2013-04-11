function initApp() {
	var modules = Zsember.to(['grid.CrudGrid']).concat(
		Shared.to(['store.data.Users']));
	Zsember.require(modules);
	Zsember.onReady(function() {
		var store = Zsember.store('sharedUsers');
		var grid = Zsember.widget('crudgrid', {
			store: store,
			title: 'Crud Grid',
			columns: [{
				'text': '姓名',
				'field': 'name',
				width: 150
			}, {
				'text': '年龄',
				'field': 'age',
				renderer: function(age) {
					return age+' 岁';
				}			
			}, {
				'text': '性别',
				'field': 'sex',
				renderer: function(sex) {
					return sex==1? '女':'男';
				}
			}, {
				'text': '身高',
				'field': 'height',
				renderer: function(height) {
					return height+' CM';
				}
			}, {
				'text': '体重',
				'field': 'weight',
				renderer: function(weight) {
					return weight+' KG';
				}
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
		var dir = 'ASC';
		Zsember.widget('alinkBtn', {
			text: 'Sort Store',
			click: function() {
				dir = (dir=='ASC')? 'DESC' : 'ASC';
				var sorters = [{
					'field': 'name',
					'dir': dir
				},{
					'field': 'age',
					'dir': (dir=='ASC')? 'DESC' : dir
				}];			
				var data = store.data;
				var tmp = data[1];
				var d = data[10]; 
				//data[1] = data[10];
				store.sort(sorters);
				store.set('data', null);
				setTimeout(function() {
					store.set('data', data);
				}, 100);
			}
		}).appendTo('#buttonDiv');		
		grid.appendTo('#gridDiv');
	});
}