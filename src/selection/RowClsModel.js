/**
 * Row Class Selection Model
 * @author JemiZhuu(周士淳,ZSword)
 * @category selection.RowClsModel
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('selection.RowClsModel', {
	extend: 'Zsember.CommonObject',
	alias: 'selection.rowcls',
	mode: 'SINGLE',
	allowDeselect: true,
	SINGLE: 'SINGLE',
	MULTI: 'MULTI',
	selCls: 'x-selected',
	onInit: function() {		
		this.initModel();
	},
	/**
	 * @protected - initialize selection model
	 */
	initModel: function() {
		var me = this,
			view = me.view;			
		if(view) {
			me.bindView(view);
		}
	},
	bindView: function(view) {
		var me = this,
			selColumn = me.selColumn;
		if(selColumn) {
			var columns = view.columns;
			columns.unshift(selColumn);
		}				
		view.addListeners({
			'click.selModel': {
				handler: view.rowSelector,
				fn: function(event) {
					var row = event.currentTarget,
						$row = $(row),
						rowsView = $row.parent(),
						rowSelector = view.rowSelector,
						$rows = rowsView.find(rowSelector);
					var idx = $rows.get().indexOf(row),
						store = view.store,
						records = store.data,
						data = records[idx];
					me.select(data, $row);
					me._fireSelectionChange();
					return false;
				}			
			}
		});
		me.view = view;
	},
	isSingle: function() {
		return this.model!=this.MULTI;
	},
	select: function(data, row) {
		var me = this,
			isSingle = me.isSingle(),
			allowDeselect = (me.allowDeselect!=false),
			selections = me.getSelection();
		var index = selections.indexOf(data);		
		if(!allowDeselect && index!=-1) {
			return;
		} else if(index!=-1) {
			if(selections.length<2) {
				selections.pop();
			} else {
				selections.splice(index, 1);
			}
		} else {
			if(isSingle) {
				selections.clear();				
			}
			selections.push(data);
		}
		me.doSelectRow(row, index);
		me._prevRow = row;
	},
	/**
	 * @protected
	 */
	doSelectRow: function(row, index) {
		var me = this,
			allowDeselect = me.allowDeselect,
			selCls = me.selCls,
			isSingle = me.isSingle();
		if(allowDeselect) {
			if(index==-1 && isSingle) {
				var prevRow = me._prevRow;
				if(prevRow) {
					prevRow.removeClass(selCls);
				}
			}
			row.toggleClass(selCls);			
		} else {			
			row.addClass(selCls);
		}
	},	
	getSelection: function() {
		var selections = this._selection = this._selection||[];
		return selections;
	},
	/**
	 * fire selection data change event
	 * @private
	 */
	_fireSelectionChange: function() {
		var me = this,
			selection = me.getSelection();
		me.fireEvent('selectionChange', selection);
	}	
});