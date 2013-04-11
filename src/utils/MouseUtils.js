/**
 * Mouse Utils
 * @author JemiZhuu(周士淳,ZSword)
 * @category utils.MouseUtils
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('utils.MouseUtils', {
	singleton: true,
	MouseWheelEvent: ('onmousewheel' in window)? 'mousewheel' : 'wheel',
	toBind: 'onwheel' in document || document.documentMode >= 9 ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],			
	getWheelDeltas : function (event) {
	    var me = this,	    	
	        dx = 0, dy = 0; // the deltas
	    event = event.originalEvent||event;
	
        if (event.wheelDeltaX!=undefined) { // WebKit has both dimensions
            dx = event.wheelDeltaX;
            dy = event.wheelDeltaY;
        } else if(event.deltaX!=undefined) {
        	dx = -event.deltaX;
        	dy = -event.deltaY;
        } else if (event.wheelDelta) { // old WebKit and IE
            dy = event.wheelDelta;
        } else if (event.detail) { // Gecko
            dy = -event.detail;            
            // Gecko sometimes returns really big values if the user changes settings to
            // scroll a whole page per scroll
            if (dy > 100) {
                dy = 3;
            } else if (dy < -100) {
                dy = -3;
            }
            // Firefox 3.1 adds an axis field to the event to indicate direction of
            // scroll.  See https://developer.mozilla.org/en/Gecko-Specific_DOM_Events
            if (event.axis && event.axis === event.HORIZONTAL_AXIS) {
                dx = dy;
                dy = 0;
            }
        }
	    return {
	        x: me.correctWheelDelta(dx),
	        y: me.correctWheelDelta(dy)
	    };
	},
    /**
     * Correctly scales a given wheel delta.
     * @param {Number} delta The delta value.
     */
    correctWheelDelta : function (delta) {
        var ret = Math.round(delta);

        if (!ret && delta) {
            ret = (delta < 0) ? -1 : 1; // don't allow non-zero deltas to go to zero!
        }
        return ret;
    },
    /**
     * Normalizes mouse wheel y-delta across browsers. To get x-delta information, use
     * {@link #getWheelDeltas} instead.
     * @return {Number} The mouse wheel y-delta
     */
    getWheelDelta: function(event) {
        var deltas = this.getWheelDeltas(event);
        return deltas.y;
    }
}, function() {
	Zsember.MouseUtils = this;
});