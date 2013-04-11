/**
 * Number Field
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.NumberField
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('form.NumberField', {
	extend: Zsember.to('form.Field'),
	alias: 'widget.numberfield',
	classNames: 'v-numberfield',
	template: ['<input type="text" class="v-textfield" {{bindAttr value="view.value" name="view.name"}} />',
	    '<div class="v-spinner"><a class="spinner-btn spinner-up" rel="add"></a><a class="spinner-btn spinner-down" rel="sub"></a></div>'],
	scale: undefined,
	value: undefined,
	max: undefined,
	min: undefined,	
	initComponent: function() {
		var me = this;
		me.buildStripRegexp();
		me.initListeners();
		me.callSuper();
	},
	initListeners: function() {
		var me = this,
			MouseUtils = Zsember.MouseUtils,
			MouseWheelEvent = MouseUtils.MouseWheelEvent;
		var listeners = {
			'click.spinner': {
				handler: '.spinner-btn',
				fn: function(event) {
					var btn = event.currentTarget,
						type = btn.rel,
						scale = me.scale,
						amount = me.scale? Math.pow(scale, 0.1) : 1;
					amount = (type=='sub')? -amount : amount;
					me.changeValue(amount);
					return false;
				}
			},
			'keypress.number': {
				handler: '.v-textfield',
				fn: function(event) {
					var KeyboardUtils = Zsember.KeyboardUtils,
						stripRegexp = me.stripValueRegexp;
					if(KeyboardUtils.isControlKeyPress(event)) {
						return true;
					}
					if(me.stripValueRegexp) {
						var char = event.keyCode||event.charCode;
						char = String.fromCharCode(char);					
						char = char.replace(stripRegexp, "");
						if(!char) {
							return false;
						}
					}
				}
			},
			'keyup.number': {
				handler: '.v-textfield',
				fn: function(event) {
					var input = event.currentTarget,
						value = input.value;
					me.setValue(value);
					if(value==me.value) {
						return;
					}				
					input.value = me.value;
				}
			}
		};
		listeners[MouseWheelEvent] = {
			handler: '.v-textfield',
			fn: function(event) {
				var input = event.currentTarget;
				if(!$(input).is(':focus')) {
					return;
				}				
				var deltaY = MouseUtils.getWheelDelta(event);
					amount = (deltaY<0)? -1 : 1;
				me.changeValue(amount);
			}
		};
		me.addListeners(listeners);
	},
	buildStripRegexp: function() {
		var me = this;
		var allowChars = ['-0-9']; 
		var stripRegexp = '[^'+allowChars+']';
		stripRegexp = new RegExp(stripRegexp, "gi");
		me.stripValueRegexp = stripRegexp;
		me.valueRegexp = Zsember.Validations.NumberRegexp;
	},	
	changeValue: function(amount) {
		var me = this,
			value = parseFloat(me.value||0);
		value = value+amount;
		me.setValue(value);
	},
	setValue: function(value) {
		var me = this,
			min = me.min,
			max = me.max,
			oldValue = me.value;
			valueRegexp = me.valueRegexp;
		if(valueRegexp) {
			if(!valueRegexp.test(value)) {
				value = oldValue;
			}
		}
		if(min) {
			value = value<min? min : value;
		}
		if(max) {
			value = value>max? max : value;
		}
		me.set('value', value);
	}	
});