/**
 * Base Form
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.Form
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('form.Form', {
	extend: 'Zsember.Component',
	requires: Zsember.to(['form.FieldItem', 'toolbar.HeaderBar', 'toolbar.ButtonBar']),
	tagName: 'form',
	classNames: 'v-form',
	attributeBindings: ['method', 'action'],
	template: '{{view view.header}}{{view view.formBody}}{{view view.buttonbar}}',
	fields: undefined,
	title: undefined,
	/**
	 * @protected - data to bind
	 */
	data: undefined,	
	initComponent: function() {
		var me = this;
		me.buildHeader();
		me.formBody = Zsember.widget('container', {
			classNames: 'form-fields'
		});		
		me.buildFields();
		me.buildToolbar();
		if(me.submit) {
			me.addListeners({
				'submit.form': me.submit
			});
		}		
		me.callSuper();
	},
	buildHeader: function() {
		var me = this,
			title = me.title,
			iconCls = me.iconCls;
		var header = {
			widget: 'headerbar',
			title: title,
			iconCls: iconCls,
			closable: me.closable,
			minimizable: me.minimizable,
			maximizable: me.maxmizable,
			collapsed: me.collapsed
		};
		header = me.header = Zsember.widget(header);
	},	
	/**
	 * @protected - build form fields
	 */
	buildFields: function() {
		var me = this,
			formBody = me.formBody;
			fields = me.fields;
		if(!fields) {
			return fields;
		}
		for(var i=0;i<fields.length;i++) {
			var field = fields[i];
			field = Zsember.apply({
				widget: 'formField'
			}, field);
			field = Zsember.widget(field);
			formBody.addItem(field);
		}
	},	
	buildToolbar: function() {
		var me = this,
			buttons = me.buttons,
			buttonbar = me.buttonbar;
		buttonbar = Zsember.apply({
			widget: 'buttonbar',
			buttons: buttons
		}, buttonbar);
		me.buttonbar = Zsember.widget(buttonbar);
	},
	getValues: function() {
		var me = this,
			data = me.data;
		if(!data) {
			var form = me.getView();
			var arr = form.serializeArray();
			data = {};
			for(var i=0;i<arr.length;i++) {
				var d = arr[i];
				var val = d.value;
				if(val==undefined || val==null || val=='') {
					continue;
				}			
				data[d.name] = val;
			}
		}
		return data;
	},
	reset: function() {
		var me = this,
			form = me.getView();
		form.reset();
	}
});