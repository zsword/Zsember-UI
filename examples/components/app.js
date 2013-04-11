function initApp() {
	var modules = Zsember.to(['tree.Tree']).concat(
		Shared.to(['store.ComponentExamples']));
	Zsember.require(modules);
	Zsember.onReady(function() {
		var tree = Zsember.widget('tree', {
			'store': 'componentExamples'			
		});
		tree.append();
	});
}
