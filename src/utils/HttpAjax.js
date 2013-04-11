/**
 * HttpAjax Utils 
 * @author JemiZhuu(周士淳,ZSword)
 * @category utils.HttpAjax
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('utils.HttpAjax', {
	singleton: true,
	ajax: function(settings) {
		$.ajax(settings);
	}
}, function() {
	Zsember.HttpAjax = this;
});