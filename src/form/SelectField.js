/**
 * Select Field
 * @author JemiZhuu(周士淳,ZSword)
 * @category form.SelectField
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('form.SelectField', {
	extend: Zsember.to('form.Field'),
	alias: 'widget.selectfield',
	classNames: 'v-selectfield',
	template: ['{{view view.selectView}}',
	    '<div class="v-trigger"></div><ul class="v-dropdown-list">{{#if view.blankLabel}}<li value="">{{view.blankLabel}}</li>{{/if}}',
	    '{{#each view.content}}<li {{_$bind value="[view.valueField]"}}>{{_$bind "[view.labelField]"}}</li>{{/each}}</ul>'],
	initComponent: function() {
		var me = this;
		var content = me.content;
		if(content.length>0) {
			if(Zsember.isArray(content[0])) {
				me.labelField = '0';
				me.valueField = '1';
			}
		}
		me.optionLabelPath = 'content.'+me.labelField;
		me.optionValuePath = 'content.'+me.valueField;
		me.initSelectView();
		me._bindListeners();
		me.callSuper();
	},
	initSelectView: function() {
		var me = this;
		var selectView = {
			contentBinding: 'parentView.content',
			optionLabelPathBinding: 'parentView.optionLabelPath',
			optionValuePathBinding: 'parentView.optionValuePath',
			promptBinding: 'parentView.blankLabel',
		};
		selectView = me.selectView = Ember.Select.create(selectView);
		me.addObserver('value', function() {
			var value = me.value,
				$selectEl = me._$selectEl = me._$selectEl||$(me.selectView.get('element'));
			$selectEl.val(value).trigger('change');
		});
	},
	_bindListeners: function() {
		var me = this;
		me.addListeners({
			'click.trigger': {
				handler: '.v-trigger',
				fn: function(event) {
					var btn = event.currentTarget,
						width = me.getView().width(),
						$droplist = $(btn).next();
					$droplist.width(width-2).show();
					return false;
				}
			},
			'click.droplist': {
				handler: '.v-dropdown-list',
				fn: function(event) {
					var li = event.target,
						$droplist = $(event.currentTarget);
					var value = $(li).attr('value');
					me.setValue(value);
					$droplist.hide();
					return false;
				}
			},
			'mouseleave.droplist': {
				handler: '.v-dropdown-list',
				fn: function(event) {
					var $droplist = $(event.currentTarget);
					$droplist.hide();
					return false;
				}
			}
		});
	}
});