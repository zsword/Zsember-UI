/**
 * JSON Data Reader
 * @author JemiZhuu(周士淳,ZSword)
 * @category data.JsonReader
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('data.JsonReader', {
	singleton: true,
	isReader: true,
	alias: 'reader.json',
	/**
	 * read data
	 * @public
	 */
	read: function(data, config) {
		var root = config.root;
		if(root) {
			data = data[root];
		}
		return this._processData(data, config);
	},
	/**
	 * process read data
	 * @private
	 */
	_processData: function(data, config, parent) {
		if(Zsember.isArray(data)) {
			var records = [];
			for(var i=0;i<data.length;i++) {
				var m = data[i];				
				m = this._processData(m, config, parent);
				if(parent) {
					m.parent = parent;
					if(i==data.length-1) {
						m.isLast = true;
					}
				}
				records.push(m);	
			}
			return records;
		}
		if(data.isModel) {
			return data;
		}
		//node data
		var Model = config.model;
		if(Model) {
			data = Zsember.create(Model, data);
		}
		//tree node data
		var children = data.children;
		if(config.isTree) {
			data.isLeaf = !children || !children.length;
		}
		if(Zsember.isArray(children)) {
			config.isTree = config.isTree||true;			
			if(!parent) {
				data.isRoot = true;
			}
			data.children = this._processData(children, config, data);			
		}
		return data;
	}	
});