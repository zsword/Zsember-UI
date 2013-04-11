/**
 * Checkbox Selection Model
 * @author JemiZhuu(周士淳,ZSword)
 * @category selection.CheckBoxModel
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('selection.CheckboxModel', {
	extend: Zsember.to('selection.RowClsModel'),
	alias: 'selection.checkbox',
	selCheckCls: 'x-selmodel-check', 
	/**
	 * @override
	 */
	initModel: function() {
		var me = this,
			isSingle = me.isSingle();		
		var checkTitle = (isSingle)? '':Zsember.renderTplHtml('<a type="checkbox" class="v-checkbox x-selmodel-checkall"></a>');
		me.selColumn = {
			field: 'id',
			width: 50,
			resizable: false,
			sortable: false,
			text: checkTitle,
			renderer: function(value, data) {
				var box = {
					field: 'id',
					name: 'id',			
					checkCls: me.selCheckCls,
					value: value
				};
				var selections = me.getSelection();
				box.checked = selections.contains(data)? true:false;
				if(isSingle) {
					return Zsember.renderRadio(box);
				}
				return Zsember.renderCheckbox(box);
			}
		};
		me.callSuper();
	},
	bindView: function(view) {
		var me = this;
		view.addListeners({
			'click.selModelCheckAll': {
				handler: '.x-selmodel-checkall',
				fn: function(event) {
					var btn = event.currentTarget,
						$btn = $(btn);
					me._checkAllBtn = $btn;
					me.toggleCheckAll($btn);
				}
			}
		});
		me.callSuper(view);
	},
	toggleCheckAll: function(checkAllBtn) {
		var me = this,
			view = me.view,
			checkedCls = 'checked',			
			viewContent = view.getView(),
			selCheckSel = '.'+me.selCheckCls,
			store = view.store,
			records = store.data,
			selections = me.getSelection(),
			rowSelector = view.rowSelector;
		checkAllBtn.toggleClass(checkedCls);
		checked = checkAllBtn.is('.'+checkedCls);
		var $checkBtnList = viewContent.find(rowSelector).find(selCheckSel);
		if(checked) {			
			$checkBtnList.addClass(checkedCls).children(':checkbox').prop('checked', true);
			for(var i=0;i<records.length;i++) {
				var rec = records[i];
				if(!selections.contains(rec)) {
					selections.push(rec);
				}
			}
		} else {			
			$checkBtnList.removeClass(checkedCls).children(':checkbox').prop('checked', false);
			selections.clear();
		}
	},
	/**
	 * @protected
	 */
	doSelectRow: function(row, index) {
		var me = this,
			allowDeselect = me.allowDeselect,
			checkedCls = 'checked',			
			selCheckSel = '.'+me.selCheckCls,
			isSingle = me.isSingle(),
			boxSel = isSingle? ':radio':':checkbox',
			checkBtnSel = selCheckSel+(isSingle? '.v-radio':'.v-checkbox');
		var checkBtn = row.find(checkBtnSel),
			boxBtn = checkBtn.children(boxSel);
		if(allowDeselect) {
			if(index==-1 && isSingle) {				
				var prevRow = me._prevRow;
				if(prevRow) {
					prevRow.find(checkBtnSel).removeClass(checkedCls).children(boxSel).prop('checked', false);
				}
			}
			checkBtn.toggleClass(checkedCls);
			var checked = !boxBtn.prop('checked');
			boxBtn.prop('checked', checked);
		} else {
			checkBtn.addClass(selCls);
			boxBtn.prop('checked', true);
		}
	}
});