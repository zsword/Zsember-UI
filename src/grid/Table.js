/**
 * Table View
 * @author JemiZhuu(周士淳,ZSword)
 * @category grid.Table
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('grid.Table', {
	extend: 'Zsember.Component',
	mixins: Zsember.toMixin(['StoreBindable']),
	alias: 'widget.gridtable',
	classNames: ["v-grid"],
	fitView: true,
	isMultiSort: false,	
	styleBinds: ['width', 'height'],
	template: ['<div class="grid-head"><table class="v-table" cellpadding="0" cellspacing="0"><thead><tr>{{#each view.columns}}<th {{bindAttr class=":cell-title sortable:cell-sort" abbr="field"}}{{_$style binds="width"}}>',
	    '<div class="title-text"><span class="icon"></span>{{text}}<span class="icon sort-icon"></span></div></th>{{/each}}</tr></thead></table></div><div class="head-space"></div>'],
	renderTpl: ['<div class="grid-body"><table class="v-table" cellpadding="0" cellspacing="0"><thead>',
	    '<tr class="header-size-row">{{#each view.columns}}<th {{_$style binds="width"}}></th>{{/each}}</tr></thead>',
	    '<tbody>{{#each view.store.data}}<tr class="grid-row">{{#each ../view.columns}}<td>{{_$outField ../this}}</td>{{/each}}</tr>{{/each}}</tbody></table></div>'],
	headTpl: '<tr>{{#each view.columns}}<th>{{text}}</th>{{/each}}</tr>',
	headEl: '.grid-head > .grid-inner > table > thead',	
	bodyTpl: '{{#each view.store.data}}<tr class="grid-row">{{#each ../view.columns}}<td>{{_$outField ../this}}</td>{{/each}}</tr>{{/each}}',
	bodyEl: '.grid-body > table > tbody',
	columns: undefined,
	rowSelector: '.grid-row',
	sortAscCls: 'sort-asc',
	sortDescCls: 'sort-desc',
	selModel: undefined,
	initComponent: function() {
		var me = this,
			ASC = Zsember.ASC,
			DESC = Zsember.DESC,
			store = me.store;
		Zsember.assert('Store must config! '+store, store);
		if(!store.isStore) {
			store = me.store = Zsember.store(store);
		}
		this.initColumns();
		var selModel = me.selModel;
		if(selModel) {
			var selType = selModel.type||selModel;			
			selModel = Zsember.apply( {
				view: me
			}, selModel);
			selType = 'selection.'+selType;
			selModel = me.selModel = Zsember.createByAlias(selType, selModel);
		}
		me.addListeners({
			'click.sort': {
				'handler': 'th.cell-sort > .title-text',
				'fn': function(event) {
					var text = event.currentTarget;
					var $th = $(text).parent(),
						col = $th[0].column,
						sortDir = col.sortDir;					
					col.sortDir = (sortDir==ASC)? DESC : ASC;
					me.doSortColumn(col);
					return false;
				}
			}			
		});
		me.callSuper();
	},
	initColumns: function() {
		var me = this,
			columns = me.columns;
		columns = me.columns = [].concat(columns);
		for(var i=0;i<columns.length;i++) {
			var col = columns[i];
			columns[i] = Zsember.apply({
				sortable: true
			}, col);
		}		
	},	
	onFirstRender: function() {
		var me = this,
			columns = me.columns,
			view = me.getView();
		me.table = view.children('table');
		var gridHead = me.gridHead = view.children('.grid-head');
		var gridBody = me.gridBody = view.children('.grid-body');
		gridBody.scroll(function() {
			var elem = this;
			var scrollLeft = elem.scrollLeft;
			gridHead.css('right', scrollLeft);
		});
		view.children('.grid-head').children('table').children('thead')
			.children('tr').children('th').each(function(idx, elem) {				
				var col = columns[idx];
				elem.column = col;
				if(col.resizable!=false) {
					$(elem).resizable({
						handles: 'e',
						minWidth: 50,
						helper: 'ui-grid-resizable-helper',
						'stop': function(event, ui) {
							var width = ui.size.width;
							col.set('width', width);						
						}
					});
				}
				var width = col.width||$(elem).width()||100;
				col.set('width', width);
			});			
		me.callSuper();
	},
	doSortColumn: function(sorter) {
		var me = this,
			DESC = Zsember.DESC,
			gridHead = me.gridHead,
			isMultiSort = me.isMultiSort,
			store = me.store,
			sortDir = sorter.sortDir,
			addCls = (sortDir==DESC)? me.sortDescCls : me.sortAscCls;
		var headCells = gridHead.children('table').children('thead').children('tr').children('th');
		if(isMultiSort) {
		} else {
			headCells.removeClass('sort-asc').removeClass('sort-desc');					
			store.sort(sorter);
		}
		var field = sorter.field;
		headCells.filter('[abbr='+field+']').toggleClass(addCls);
	},
	onResize: function() {
		var me = this,
			$head = me.gridHead,
			$table = me.gridBody.children('.v-table');
		var tableWidth = $table.width();
		tableWidth = (tableWidth<$head.width())? tableWidth:'100%';
		$head.width(tableWidth);
	},
	buildSorters: function() {
	}
});