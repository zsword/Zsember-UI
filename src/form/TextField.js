/**
 * Text Input Field
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.TextField
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('form.TextField', {
	extend: Zsember.to('form.Field'),
	alias: 'widget.textfield',
	tagName: 'input',
	classNames: 'v-textfield',
	type: 'text',
	value: undefined,	
	allowChars: undefined,
	valueRegexp: undefined,
	/**
	 * stripValueRegexp
	 * @private 
	 */
	initComponent: function() {
		var me = this;
		me.buildStripRegexp();
		me.callSuper();
	},
	buildStripRegexp: function() {
		var me = this,
			allowChars = me.allowChars;
		if(!allowChars) {
			return allowChars;
		}
		var stripRegexp = '['+allowChars+']';
		stripRegexp = new RegExp(stripRegexp, "gi");
		me.stripValueRegexp = stripRegexp;
	},
	setValue: function(value) {
		var me = this,
			valueStrip = me.stripValueRegexp;
		if(valueStrip) {
			value = value.replace(valueStrip, "");
		}
		me.callSuper(value);
	}
});