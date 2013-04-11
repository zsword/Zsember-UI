/**
 * Abstract Form Input Field
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.Field
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('form.Field', {
	extend: 'Zsember.Component',
	attributeBindings: ['name', 'value', 'title', 'type'],
	initComponent: function() {
		var me = this;
		me.addListeners({
			'change.bindValue': function(event) {
				var input = event.target,
					value = input.value;
				me.setValue(value);
			}		
		});
		me.callSuper();
	},
	setValue: function(value) {
		var me = this,
			fname = me.name,
			data = me.data;			
		if(data.set) {
			data.set(fname, value);
		} else {
			Zsember.setValue(data, fname, value);
		}		
	}	
});