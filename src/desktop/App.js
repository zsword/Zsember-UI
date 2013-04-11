/**
 * Base Desktop Application
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.App
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineDesktop('App', {
	extend: Zsember.to('app.Application'),
	requires: Zsember.to(['desktop.Desktop']),
	initApp: function() {
		var me = this,
			LIB = Zsember;
		var desktop = me.loadDesktopCfg();
		LIB.apply(desktop, {
			widget: 'desktop'
		});
		desktop = me.desktop = Zsember.widget(desktop);
		me.callSuper();
	},
	/**
	 * @abstract
	 * @protected
	 */
	loadDesktopCfg: Zsember.EmptyFn
});