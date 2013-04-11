/**
 * Desktop WallPaper Component
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.WallPaper
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.WallPaper', {
	extend: 'Zsember.Component',
	alias: 'widget.desktopWallPaper',
	tagName: 'img',
	imageCls: 'Wall-Win7',
	classNames: 'v-desktop-wallpaper',
	src: undefined,	
	initComponent: function() {
		var me = this,
			imageCls = me.imageCls;
		me.classNames = [imageCls].concat(me.classNames);
		me.callSuper();
	}
});