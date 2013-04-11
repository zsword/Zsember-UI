function initApp() {
	var modules = Zsember.to(['tree.Tree']).concat(
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
		var store = Zsember.store('sharedRandomMenus');
		var tree = Zsember.widget('tree', {
			'store': store	
		});		
		tree.append();
	});
}