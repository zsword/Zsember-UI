/**
 * StoreUtils
 * @author JemiZhuu(周士淳,ZSword)
 * @category utils.MouseUtils
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('store.StoreUtils', {
	singleton: true,
	buildFormFields: function(store, optType) {
		var model = store.getModel();
		return this.buildFormFieldsByModel(model, optType);
	},
	buildFormFieldsByModel: function(model, optType) {
		var fields = model.fields;
		var formFields = [];
		for(var i=0;i<fields.length;i++) {
			var f = fields[i];
			if(f.filter==false && optType=='filter') {
				continue;
			}
			var fname = f.name||f;
			var label = f.comment||Zsember.String.capitalize(fname);
			f = Zsember.apply({
				label: label,
				name: fname
			}, f);
			formFields.push(f);
		}
		return formFields;
	}	
}, function() {
	Zsember.StoreUtils = this;
});