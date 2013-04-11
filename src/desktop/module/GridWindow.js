/**
 * Desktop Grid Window Module
 * @author JemiZhuu(周士淳,ZSword)
 * @category desktop.module.GridWindow
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('desktop.module.GridWindow', {
	extend: Zsember.to('desktop.module.Window'),
	requires: Zsember.to(['grid.CrudGrid']),
	alias: 'widget.gridWindow',
	id: 'grid-win'
});