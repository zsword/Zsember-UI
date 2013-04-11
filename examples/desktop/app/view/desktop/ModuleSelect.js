AppCore.defineView('desktop.ModuleSelect',{
	extend: ZSEUI.to('form.SelectField'),
	alias: 'widget.desktopModuleSel',
	blankLabel: '-无-',
	content: [['窗口','win'],['表格窗口','grid-win'],
	    ['内部窗口','iframe-win']]
});