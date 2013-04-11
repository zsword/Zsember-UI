/**
 * Tree
 * @author JemiZhuu(周士淳,ZSword)
 * @category tree.Tree
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('tree.Tree', {
	extend: 'Zsember.tree.TreeView',
	requires: Zsember.to(['data.TreeNode', 'store.TreeStore']),
	alias: 'widget.tree',
	tagName: 'ul',
	store: undefined,
	root: undefined,
	showRoot: true,
	classNames: ['v-tree', 'line'],
	expandCls: 'node-expand',
	collapseCls: 'node-collapse',
	showCheckbox: false,
	checkboxName: 'checkedIds',
	checkboxValueField: 'id',
	checkedFullCls: 'checked',
	checkedHalfCls: 'half_checked',
	animation: {
		type: 'blind'
	},
	template: ['{{#if view.showRoot}}<li {{bindAttr class=":tree-node view.root.isRoot view.expandCls"}}><span class="icon node-ctr node-handle"></span>',
	    '<a {{bindAttr href="view.root.action"}}>',
	    '<span {{bindAttr class=":icon :node-icon :node-ctr view.root.iconCls::root-icon view.root.iconCls"}}></span><span>{{view.root.text}}</span></a>',
	    '<ul class="v-tree">{{/if}}{{#each view.root.children}}',
	    '<li {{bindAttr class=":tree-node view.expandCls isLeaf isLast"}}><span class="icon node-ctr node-handle"></span>',
	    '{{#if view.showCheckbox}}<span class="v-checkbox"><input type="checkbox" {{_$bind name="view.checkboxName" value="[view.checkboxValueField]"}} /></span>{{/if}}',
	    '<a {{bindAttr href="action"}}><span {{bindAttr class=":icon :node-ctr iconCls::node-icon iconCls"}}></span><span>{{text}}</span></a>',
	    '{{#if children}}{{view Zsember.tree.Tree rootBinding=this showRoot=false}}{{/if}}',
	    '</li>{{/each}}{{#if view.showRoot}}</ul></li>{{/if}}'],
	initComponent: function() {
		var me = this;		
		me.initTree();
		me.callSuper();
	},
	initTree: function() {
		var me = this,
			root = me.root,
			store = me.store||'tree';
		var parentView = me.getParentView();
		if(parentView) {
			var parentBinds = ['showCheckbox', 'checkboxName', 'checkboxValueField', 'checkedFullCls', 'checkedHalfCls'];
			for(var i=0;i<parentBinds.length;i++) {
				var attr = parentBinds[i];
				me[attr] = parentView[attr];
			}
		}		
		if(!store.isStore) {
			store = me.store = Zsember.store(store, {
				root: root
			});
		}
		if(!store.isStore) {
			throw TypedError('Store is must config!'+store);
		}
		store.on('load', function() {
			root = store.root;
			me.bindNode(store.root);
		});		
		root = store.root;
		if(!root) {
			return store.load();
		}		
		me.bindNode(root);
	},
	bindNode: function(node) {
		var me = this;
		me.classNames = (node.isRoot || node.isLast)? ['v-tree'] : me.classNames;		
		if(node.isRoot) {
			if(!me._bindedEvents) {
				me._bindedEvents = true;
				me.addListeners({				
					'click.handle': {
						'handler':'.node-ctr',
						'fn': function(event) {
							var handle = event.currentTarget;						
							var node = $(handle).parent();
							if(node.is('a')) {
								if(node[0].href) {
									return false;
								}
								node = node.parent();
							}
							this.toggleNode(node);
							return false;
						}
					},
					'click.checkbox': {
						handler: '.v-checkbox',
						fn: function(event) {
							var $btn = $(event.currentTarget);
							me.checkedNodeByBox($btn);
						}
					}
				});
			}
		}
		me.set('root', node);
	},	
	toggleNode: function(node) {
		var me = this,			
			collapseCls = me.collapseCls,
			anim = me.animation;
		node.children('.v-tree').toggle(anim.type, anim.speed||300, function() {
			node.toggleClass(collapseCls);
		});
	},
	checkedNodeByBox: function($hand) { 
			var me = this,
				checkFullCls = me.checkedFullCls,
				checkHalfCls = me.checkedHalfCls,
				checkBtnCls = '.v-checkbox',
				$box = $hand.children(':checkbox'),
				$node = $hand.parent();
		var checked = !$box.prop('checked');		
		var $checkList = $node.find(checkBtnCls);
		for(var i=0;i<$checkList.length;i++) {
			var btn = $checkList[i],
				$btn = $(btn),
				check = $btn.children(':checkbox')[0];
			check.checked = checked;
			if(checked) {
				$btn.addClass(checkFullCls);				
			} else {
				$btn.removeClass(checkFullCls+' '+checkHalfCls);
			}
		}
		$box.prop('checked', checked);
		me._checkedParentNode($node);
	},
	_checkedParentNode: function($node) { 
		var me = this,		
			checkFullCls = me.checkedFullCls,
			checkHalfCls = me.checkedHalfCls,
			checkBtnCls = '.v-checkbox';
		var $pNode = $node.parent('ul').parent('li');
		var $pBtn = $pNode.children(checkBtnCls);
		if(!$pBtn.length) {
			return;
		} 
		var $pCheckList = $node.parent('ul').children('li').children(checkBtnCls);
		var pCheckedCount = $pCheckList.filter('.'+checkFullCls).length||$pCheckList.filter('.'+checkHalfCls).length;
		var pCheckCls = checkFullCls;
		if(pCheckedCount==0) {
			pCheckCls = undefined;
		} else if ($pCheckList.length!=pCheckedCount) {
			pCheckCls = checkHalfCls;
		}
		var checked = (pCheckCls!=undefined);
		var box = $pBtn.children(':checkbox')[0];
		box.checked = checked;
		$pBtn.removeClass(checkFullCls+' '+checkHalfCls);
		if(checked) {
			$pBtn.addClass(pCheckCls);
		}
		me._checkedParentNode($pNode);
	},
	getCheckedValues: function() {
		var me = this;
		if(!me.showCheckbox) {
			return;
		}
		var checkboxName = me.checkboxName,
			view = me.getView();
		var $boxList = view.find(':checked[name="'+checkboxName+'"]');
		if(!$boxList.length) {
			return;
		}
		var values = [];
		for(var i=0;i<$boxList.length;i++) {
			var box = $boxList[i];
			values.push(box.value);
		}
		return values;
	}
});