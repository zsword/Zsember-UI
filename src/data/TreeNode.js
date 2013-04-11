/**
 * Base TreeNode
 * @author JemiZhuu(周士淳,ZSword)
 * @category data.TreeNode
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('data.TreeNode', {
	extend: Zsember.to('data.Model'),
	isTreeNode: true,
	fields: [
	    'text',
	    'children',
	    'iconCls',
	    'action',
	    'parent'
	]/*,
	isRoot: function() {
		return !this.parent;
	}.property('parent'),
	isLeaf: function() {
		return !this.children || !this.children.length;
	}.property('children'),
	isLast: function() {
		if(this.get('isRoot')) {
			return true;
		}		
		var parent = this.parent,		
			childArray = parent.children;
		return childArray.indexOf(this)==childArray.length-1;
	}.property('parent')*/
});