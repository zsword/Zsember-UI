/**
 * Model Editor Form
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.ModelForm
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('form.ModelForm', {
	extend: Zsember.to('form.Form'),
	alias: 'widget.modelForm',
	/**
	 * 
	 * @protected - data
	 */
	/**
	 * @protected - data search store
	 * @required
	 */	
	store: undefined,
	closable: true,
	isEditing: false,
	optType: 'editor',
	initComponent: function() {
		 var me = this;
		 if(me.data) {
			 me._bufferData = me.data;
			 delete me.data;
		 }
		 me.initForm();
		 me.initButtons();
		 me.callSuper();
	},
	initForm: function() {
		if(!this.store) {
			throw new TypeError('ModelForm`s data store is required!');
		}		
		var me = this,
			fields = me.fields;
			StoreUtils = Zsember.StoreUtils,
			store = me.store;
		if(!fields) {
			fields = StoreUtils.buildFormFields(store, me.optType);
		} 
		for(var i=0;i<fields.length;i++) {
			var f = fields[i];
			Zsember.apply(f, {
				form: me,
				valueBinding: 'view.form.data'
			});
		}		
		me.fields = fields;
	},
	initButtons: function() {
		var me = this,
			buttons = me.buttons;
		var formButtons = [{
			text: 'Save',
			type: 'submit'
		},{
			text: 'Reset',
			type: 'reset'
		},{
			text: 'Cancel',
			rel: 'close'
		}];
		if(buttons) {
			formButtons = formButtons.concat(buttons);
		}
		me.buttons = formButtons;
	},
	onFirstRender: function() {
		var me = this,
			bufferData = me._bufferData;
		if(bufferData) {
			delete me._bufferData;
			me.bindData(bufferData);
		}
		me.callSuper();
	},
	bindData: function(data) {
		var me = this;
		if(data!=me.data) {
			me.set('data', data);
		}
		me.isEditing = true;
		me.show();
	},
	reset: function() {
		var me = this;
		me.callSuper();
		var data = me.data;
		if(data) {
			me.bindData(data);
		}
	},
	submit: function() {
		var me = this,
			store = me.store,
			data = me.data;
		try {
			store.save(data);
		} catch(e) {
			alert(e);
		}
		return false;
	},	
	close: function() {
		this.isEditing=false;
		this.callSuper();
	}	
});