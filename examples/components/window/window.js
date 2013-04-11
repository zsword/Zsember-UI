function initApp() {
	var modules = Zsember.to(['window.Window']);
	Zsember.require(modules);
	Zsember.onReady(function() {
		var win = Zsember.widget('window', {
			'top': 100,
			'autoDestroy': false
		});
		win.append();
		Zsember.widget('alinkBtn', {
			text: 'Open Window',
			click: function() {
				win.popup();
			}		
		}).append();		
		Zsember.widget('alinkBtn', {
			text: 'Change Window',
			click: function() {
				win.set('maximize', !win.maximize);
				win.setAttrs({'top':50, 'left':50, 'width':200, 'height':150});
			}
		}).append();
	});	
}
