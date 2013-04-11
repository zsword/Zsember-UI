var _global = this;
(function() {
_global.locHref = _global.location.href;
_global.RootUrl = locHref.replace(/\/examples\/.*/g, '');
seajs.config({
	vars: {
		'theme': RootUrl+'/resources/themes/default',
		'Zsember': RootUrl+'/src'
	}
});
})();

define(function(require, exports, module) {
	//require('jquery-ui/jquery-ui.min.css');
	require('{theme}/zsember-ui.css');
	require('jquery-1.9.1.min');
	require('handlebars');
	require.async(['jquery.easing.1.3',
	    'jquery-ui/jquery-ui-1.10.1.min',
		'ember-1.0.0-rc.1.min'], function() {
		require.async(['{Zsember}/Core'], function() {
			var BaseModules = Zsember.to(['button.AlinkButton']);
			var title = document.title;
			var AppPrefix = "Zsember Examples - ";				
			if(title.indexOf(AppPrefix)!=0) {
				document.title = AppPrefix+title;
			}			
			_global.SharedRoot = RootUrl+'/examples/shared';
			Zsember.createNamespace('Shared', ['model', 'store', 'utils'], SharedRoot);
			var SharedModules = Shared.to(['utils.RandomDataUtils']);
			BaseModules = BaseModules.concat(SharedModules);
			function createApp() {
				var backUrl = undefined;
				var indexUrl = RootUrl+'/index.html';
				if(locHref.indexOf('examples/desktop/')!=-1) {
				} else if(/\/examples\/.*\/.*index\.html/g.test(locHref)) {
					backUrl = '../../index.html';
				}
				var backDiv = $('<div id="heleBtns" style="bottom:5px;right:5px;z-index:9999;position:fixed;"></div>');
				var area = backDiv[0];
				var indexBtn = Zsember.widget('alinkBtn', {
					'text': 'Go Home',
					'href': indexUrl
				});
				indexBtn.appendTo(area);				
				if(backUrl) {
					var backBtn = Zsember.widget('alinkBtn', {
						'text': 'Back to Index',
						'href': backUrl
					});
					backBtn.appendTo(area);
				}
				$('body').prepend(backDiv);
				if(_global.initApp) {
					initApp();
				}
			}			
			Zsember.require(BaseModules, createApp);
		});		
	});

});