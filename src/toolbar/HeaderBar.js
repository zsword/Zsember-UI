/**
 * HeaderBar
 * @author JemiZhuu(周士淳,ZSword)
 * @category toolbar.HeaderBar
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('toolbar.HeaderBar', {
	extend: 'Zsember.Component',
	alias: 'widget.headerbar',
	classNames: 'v-header-bar x-unselectable',
	title: undefined,
	iconCls: undefined,
	collapsable: true,
	closable: false,
	minimizable: false,
	maximizable: false,
	collapsed: undefined,
	expandCls: 'icon-expand-bottom',
	collapseCls: 'icon-collapse-top',
	template: ['<span class="header-title"><span {{bindAttr class=":x-icon view.iconCls"}}></span>',
	    '{{view.title}}</span><div class="header-buttons">{{#each view.buttons}}',
	    '<a {{bindAttr class=":icon-btn iconCls" rel="action"}}></a>{{/each}}',
	    '{{#if view.collapsable}}<a class="icon-btn icon-collapse-top" rel="toggleCollapse"></a>{{/if}}',
	    '{{#if view.minimizable}}<a title="最小化" class="icon-btn icon-minimize" rel="min"></a>{{/if}}',
	    '{{#if view.maximizable}}<a title="最大化" class="icon-btn icon-maximize" rel="max"></a>{{/if}}',
	    '{{#if view.closable}}<a title="关闭" class="icon-btn icon-close" rel="close"></a>{{/if}}',
	    '</div>'],
	initComponent: function() {
		var me = this;
		me.addListeners({
			'click.button': {
				handler: '.icon-btn',
				fn: function(event) {
					var btn = event.currentTarget,
						action = btn.rel,
						parentView = me.getParentView();
					if(parentView) {
						if(action=='toggleCollapse') {
							me.toggleCollapse($(btn));
						} else {
							parentView.fireEvent(action);
						}
					} else {
						me.fireEvent(action);
					}
				}
			}
		});
		me.callSuper();
	},
	onFirstRender: function() {
		var me = this;
		if(me.collapsed==true) {
			me.toggleCollapse();
		}
		me.callSuper();
	},	
	toggleCollapse: function(btn) {
		var me = this,
			view = me.getView(),
			collapseCls = me.collapseCls,
			expandCls = me.expandCls,
			parentView = me.getParentView(),
			pView = parentView.getView();
		btn = btn||me._collapseBtn||view.find('.'+collapseCls);
		pView.children().not(view[0]).toggle();
		btn.toggleClass(expandCls);
		me._collapseBtn = btn;
	}	
});