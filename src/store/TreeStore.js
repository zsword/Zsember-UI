/**
 * Tree Store
 * @author JemiZhuu(周士淳,ZSword)
 * @category store.TreeStore
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('store.TreeStore', {
	extend: Zsember.to('store.AjaxStore'),
	alias: 'store.tree',
	model: Zsember.to('data.TreeNode'),
	root: undefined,
	url: undefined
});