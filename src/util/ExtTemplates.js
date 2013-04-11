/**
 * Simple Templates
 * @author JemiZhuu(周士淳,ZSword)
 * @category utils.MouseUtils
 * @version 0.1
 * @since 2013-4-11
 */
define(function(require, exports, module) {

var CHECKED_CLS = 'checked';
var TplHelper = Handlebars; 
var CheckboxTpl = ['<label><span class="v-checkbox {{checkCls}}">',
    '<input type="checkbox" name="{{name}}" value="{{value}}" checked="{{checked}}" /></span></label>'];
CheckboxTpl = TplHelper.compile(CheckboxTpl.join(''));
var RadioTpl = ['<label><span class="v-radio {{checkCls}}">',
    '<input type="radio" name="{{name}}" value="{{value}}" checked="{{checked}}" /></span></label>'];
RadioTpl = TplHelper.compile(RadioTpl.join(''));
function processCheckCfg(cfg) {
	var isChecked = cfg.checked;
	if(isChecked) {
		var checkCls = cfg.checkCls||'';
		if(checkCls.indexOf(CHECKED_CLS)==-1) {
			checkCls = CHECKED_CLS+' '+checkCls;
			cfg.checkCls = checkCls;
		}
	}
	return cfg;
}
exports.renderCheckbox = function(cfg) {
	processCheckCfg(cfg);
	return CheckboxTpl(cfg);
}
exports.renderRadio = function(cfg) {
	processCheckCfg(cfg);
	return RadioTpl(cfg);
}

});
