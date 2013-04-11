/**
 * Desktop Iframe Window Module
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.module.IframeWindow
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineDesktop('module.IframeWindow', {
	extend: Zsember.to('desktop.module.Window'),
	alias: 'widget.iframeWindow',
	id: 'iframe-win',
	createView: function(cfg) {
		var url = cfg.url;
		url = (url.indexOf('://')==-1)? 'http://'+url:url;
		cfg = {
			widget: 'component',
			tagName: 'iframe',
			fitView: true,
			attributeBindings: ['src'],
			src: url,
			title: cfg.title,
			iconCls: cfg.iconCls,
			icon: cfg.icon
		};
		return this.callSuper(cfg);
	}	
});