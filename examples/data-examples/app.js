function initApp() {
	var modules = Zsember.to(['tree.TreePanel']).concat(
		Shared.to(['store.StoreExamples']));
	Zsember.require(modules);
	Zsember.onReady(function() {
		var tree = Zsember.widget('tree', {
			'store': 'storeExamples'
		});
		tree.append();
	});
}
