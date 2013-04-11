/**
 * Keyboard Utils  
 * @author JemiZhuu(周士淳,ZSword)
 * @category utils.KeyboardUtils
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('utils.KeyboardUtils', {
	singleton: true,
	KeyOptions: {
    	left: 37,
    	right: 39,
    	up: 38,
    	down: 40,
    	space: 32,
    	pageUp: 33,
    	pageDown: 34,
    	del: 46,
    	backspace: 8,
    	home: 36,
    	end: 35,
    	enter: 13,
    	esc: 27,
    	tab: 9
	},
	isControlKeyPress: function(event) {
		var keyCode = event.keyCode,
			charCode = event.charCode;
		if(charCode==0) {
			return true;
		}
	}
}, function() {
	Zsember.KeyboardUtils = this;
});