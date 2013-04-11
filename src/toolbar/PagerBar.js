/**
 * PagerBar
 * @author JemiZhuu(周士淳,ZSword)
 * @category toolbar.PagerBar
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('toolbar.PagerBar', {
	extend: 'Zsember.Component',
	alias: 'widget.pagerbar',
	classNames: 'v-pager-bar',
	firstText: 'First Page',
	prevText: 'Previous Page',
	nextText: 'Next Page',
	lastText: 'Last Page',
	refreshText: 'Refresh Page',
	pageSizeList: [5, 10, 20, 30, 40, 50],
	/**
	 * @require
	 * @property - page store
	 */
	store: undefined,
	template: ['<div class="float-left"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr>',
	    '<td><a {{bindAttr class=":page-button :page-first view.store.isFirstPage:disabled"}} {{bindAttr title="view.firstText"}} rel="firstPage"></a></td>',
	    '<td><a {{bindAttr class=":page-button :page-prev view.store.isFirstPage:disabled"}} {{bindAttr title="view.prevText"}} rel="prevPage"></a></td>',
	    '<td><span class="page-split"></span></td>',
	    '<td><span class="grid-page-content">第</span><span class="cur-page grid-page-number">{{view.store.pageNo}}</span><span class="grid-page-content">页</span></td>',
	    '<td style="padding-left:4px;"><span class="grid-page-content">共</span><span class="total-page grid-page-number">{{view.store.totalPages}}</span><span class="grid-page-content">页</span></td>',
	    '<td><span class="page-split"></span></td>',
	    '<td><a {{bindAttr class=":page-button :page-next view.store.isLastPage:disabled"}} {{bindAttr title="view.nextText"}} rel="nextPage"></a></td>',
	    '<td><a {{bindAttr class=":page-button :page-last view.store.isLastPage:disabled"}} {{bindAttr title="view.lastText"}} rel="lastPage"></a></td>',
	    '<td><span class="page-split"></span></td>',
	    '<td><a class="page-button page-refresh" {{bindAttr title="view.refreshText"}} rel="refreshPage"></a></td>',
	    '<td><span class="page-split"></span></td>',
	    '<td>{{view Ember.Select contentBinding=view.pageSizeList valueBinding=view.store.pageSize classNames="page-size"}}</td>',
	    '</tr></tbody></table></div><div class="float-right"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr>',
	    '<td><div class="total-count">共找到{{view.store.totalItems}}条记录</div></td></tr></tbody></table></div><div class="clear"></div>'],
	initComponent: function() {
		var me = this;
		me.addListeners({
			'click.page': {
				'handler': '.page-button',
				'fn': function(event) {
					var btn = event.currentTarget,
						action = btn.rel;
					if($(btn).is('.disabled')) {
						return false;
					}
					me.executeAction(action);
					return false;
				}
			},
			'change.pageSize': {
				'handler': '.page-size',
				'fn': function(event) {
					var sel = event.currentTarget;
					var pageSize = sel.value;
					me.setPageSize(pageSize);
					return false;
				}
			}			
		});
		me.callSuper();
	},
	executeAction: function(action) {
		var me = this,
			doFn = me[action];
		if(doFn) {
			doFn.apply(me, arguments);
		}
	},
	setPageSize: function(size) {
		this.store.setPageSize(size);
	},	
	_toPage: function(pageNo) {
		this.store.findPage(pageNo);
	},	
	firstPage: function() {
		this._toPage(1);
	},
	prevPage: function() {
		var store = this.store,
			prevPage = store.pageNo-1;
		this._toPage(prevPage);
	},
	nextPage: function() {
		var store = this.store,
			nextPage = store.pageNo+1;
		this._toPage(nextPage);
	},
	lastPage: function() {
		var store = this.store,
			lastPage = store.totalPages;
		this._toPage(lastPage);
	},
	refreshPage: function() {
		var store = this.store,
			pageNo = store.pageNo;
		this._toPage(pageNo);
	}
});