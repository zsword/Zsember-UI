function initApp() {
	var _global = this;
	_global.LocalRoot = _global.RootUrl+'/examples/desktop';
	Zsember.loadResources(['{theme}/desktop.css']);
	var APP_NAME = 'DesktopApp';	
	var loaderPath = {};
	loaderPath[APP_NAME] = '../examples/desktop/app';
	Zsember.configLoader(loaderPath);
	var AppCore = Zsember.createNamespace(APP_NAME);
	_global.AppCore = AppCore;	
	Zsember.createApp(APP_NAME+'.App', {
		name: APP_NAME
	});
}
