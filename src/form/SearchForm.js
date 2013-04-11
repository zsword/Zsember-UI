/**
 * Store Search Form
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.SearchForm
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('form.SearchForm', {
	extend: Zsember.to('form.ModelForm'),
	alias: 'widget.searchForm',
	closable: false,
	optType: 'filter',
	initButtons: function() {
		var me = this,
			buttons = me.buttons;
		me.data = me.data||{};
		var formButtons = [{
			text: 'Search',
			type: 'submit'
		},{
			text: 'Reset',
			type: 'reset'
		}];
		if(buttons) {
			formButtons = formButtons.concat(buttons);
		}		
		me.buttons = formButtons;
	},
	submit: function() {
		var me = this,
			filters = me.getValues(),
			store = me.store;
		store.doFilter(filters);
		return false;
	}
});