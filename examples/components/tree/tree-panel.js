function initApp() {
	var modules = Zsember.to(['tree.TreePanel']).concat(
		Shared.to(['store.data.RandomMenus']));
	Zsember.require(modules);	
	Zsember.onReady(function() {
		Zsember.widget('alinkBtn', {
			text: 'Change Data',
			click: function() {
				var store = tree.store,
					data = store.data;				
				data.children[1].set('text', 'ABC');
			}
		}).appendTo('#buttonDiv');		
		Zsember.widget('alinkBtn', {
			text: 'Get Checked Data',
			click: function() {
				alert(tree.getCheckedValues());
			}
		}).appendTo('#buttonDiv');
		var store = Zsember.store('sharedRandomMenus');
		store.alwaysRandom = true;
		var tree = Zsember.widget('treepanel', {
			'store': store,
			title: 'Tree Panel',
			treeView: {
				showCheckbox: true,
				checkboxName: 'checkedMenuIds'
			}
		});		
		tree.appendTo('#treeDiv');
	});
}