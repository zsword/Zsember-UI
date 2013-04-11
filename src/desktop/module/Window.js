/**
 * Desktop Window Module
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.module.Window
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.module.Window', {
	extend: Zsember.to('desktop.Module'),
	requires: Zsember.to(['window.Window']),
	alias: 'widget.windowModule',
	id:'win',
	createView: function(cfg) {
		cfg.widget = cfg.widget||cfg.view;
		return Zsember.widget('window', {
			title: cfg.title,
			iconCls: cfg.iconCls,
			icon: cfg.icon,
			items: [cfg]
		});
	}	
});