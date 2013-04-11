function initApp() {
	var modules = Shared.to(['store.CookieUsers', 'store.data.Users']);
	Zsember.require(modules);
	Zsember.onReady(function() {
		var store = Zsember.store('sharedCookieUsers');
		store.on('load', function() {
			var data = store.data;
			alert(data);
		});	
		store.load();
	});
}