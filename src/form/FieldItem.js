/**
 * Form Field Item
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.FieldItem
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.define('form.FieldItem', {
	extend: 'Zsember.Component',
	requires: Zsember.to(['form.TextField', 'form.NumberField',
	    'form.SelectField']),
	alias: 'widget.formField',
	classNames: 'v-form-field',
	template: '<label>{{#if view.label}}{{view.label}}：{{/if}}{{view view.editor}}</label>',
	initComponent: function() {		
		var me = this;
		me.buildEditor();
		me.callSuper();
	},
	buildEditor: function() {
		var me = this,
			form = me.form,
			editor = me.editor||{},
			xtype = editor.xtype;
		if(!xtype) {
			xtype = me.resolveEditorType(me.type);
		}		
		xtype = xtype||'textfield';
		if(form) {			
			var fname = me.name;
			editor = Zsember.apply({
				form: form,
				name: fname,
				dataBinding: 'this.form.data',
				valueBinding: 'this.data.'+fname
			}, editor);
		}
		editor = Zsember.widget(xtype, editor);
		me.editor = editor;
	},
	resolveEditorType: function(type) {
		switch(type) {
		case 'number':
			return 'numberfield';
		}		
		return 'textfield';
	}	
});