AppCore.defineView('desktop.IconClsSelect', {
	extend: ZSEUI.to('form.SelectField'),
	alias: 'widget.desktopIconClsSel',
	content: [['电脑','computer'], ['文档','document'], ['开始菜单','startmenu'], ['快捷方式','shortcut'],
	    ['百度','baidu'], ['Apple','apple'], ['Bing','bing'], ['Ebay','ebay'], ['FaceBook','facebook'],
	    ['FireFox','firefox'], ['Flickr','flickr'], ['Google','google'],
	    ['Help','help'], ['SoyosLab','soyos'], ['Wikipedia','wikipedia'],
	    ['WordPress','wordpress'], ['Youtube','youtube']]
});