AppCore.defineStore('LocalStore', {
	extend: Zsember.toStore('JsonStore'),
	localRoot: LocalRoot,
	initStore: function() {
		var me = this,
			localRoot = me.localRoot,
			url = me.url;
		if(url) {			
			me.url = localRoot+url;
		}		
		me.callSuper();
	}
});