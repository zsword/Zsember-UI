function initApp() {
	var modules = Zsember.to(['form.ModelForm']).concat(
		Shared.to(['store.data.Users']));
	Zsember.require(modules);
	Zsember.onReady(function() {
		var store = Zsember.store('sharedUsers');
		var user = store.data[1];
		var form = Zsember.widget('modelForm', {
			store: store,
			data: user
		});		
		form.append();
	});
}