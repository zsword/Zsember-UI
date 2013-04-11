function initApp() {
	Zsember.onReady(function() {
		Zsember.widget('alinkBtn', {
			text: 'A Link Button',
			href: 'http://www.baidu.com',
			target: '_btnView',
			click: function() {
				var btn = this;
				return confirm('U clicked this button! '+btn+'\n Do u want open the url?');				
			}
		}).append();
	});
}