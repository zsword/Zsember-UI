/**
 * Base Store
 * @author JemiZhuu(周士淳,ZSword)
 * @category store.Store
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('store.Store', {
	extend: 'Zsember.StoreBase',
	mixins: Zsember.toMixin(['Sortable']),
	requires: Zsember.to(['data.JsonReader','data.Model']),
	alias: 'store.store',
	Actions: {
		LOAD: 'LOAD',
		SAVE: 'SAVE',
		REMOVE: 'REMOVE'
	},
	actionsMapping: {},
	reader: 'json',
	pageNo: 1,
	isFirstPage: true,
	isLastPage: true,
	pageSize: undefined,
	bufferData: undefined,
	data: undefined,
	defaultPageParams: {
		pageNo: 'pageNo',
		pageSize: 'pageSize',
		totalItems: 'totalItems',
		dataRoot: 'content',
		pageNoParam: 'page.pageNo',
		pageSizeParam: 'page.pageSize'
	},
	initStore: function() {
		var me = this,
			pageParams = me.pageParams,
			reader = me.reader;
		if(!me.model) {
			throw new TypeError('Store Model is required! '+me.model);
		}
		if(pageParams) {
			var defaultPageParams = me.defaultPageParams;
			pageParams = me.pageParams = Zsember.apply(null, defaultPageParams, pageParams);			
		}		
		if(reader) {
			if(Zsember.isString(reader)) {
				reader = {'reader': reader};
				me.reader = reader;
			}
			if(!reader.isReader) {
				reader = reader.reader||reader;
				reader = 'reader.'+reader;
				me.dataReader = Zsember.createByAlias(reader);
			}
		}
		me.callSuper();
		if(!me.data && me.autoLoad) {
			me.load();
		}		
	},
	initData: function() {
		var me = this,
			data = me.bufferData||me.data||me.root;
		if(data) {
			data = me.bindData(data);
		}
		me.callSuper();
	},	
	load: function() {
		var me = this,
			data = me.bufferData||me.data||me.root;
		return this.handleLoadSuccess(data);
	},
	handleLoadSuccess: function(data) {
		var me = this;
		data = me.bindData(data);
		me.fireEvent('load');
		return data;
	},
	handleLoadFailed: function() {
		alert('Load data error!');
	},
	bindData: function(data, isRefresh) {
		var me = this,
			reader = me.dataReader,
			records = data;
		var pageNo = me.pageNo,
			pageSize = me.pageSize,
			totalItems = me.totalItems||0;
		if(!data) {
			me.set('data', records);
		} else {
			totalItems = data.length||totalItems;
			if(isRefresh) {
			} else {
				var pageParams = me.pageParams;
				if(pageParams) {
					var dataRoot = pageParams.dataRoot;					
					pageNo = pageParams.pageNo;
					pageNo = data[pageNo];
					pageSize = pageParams.pageSize;
					pageSize = parseInt(data[pageSize]);
					totalItems = pageParams.totalItems;
					totalItems = parseInt(data[totalItems]);
					if(dataRoot) {
						data = data[dataRoot];
					}
				}
				if(reader && reader.isReader) {			
					var readCfg = me.reader;
					readCfg.model = me.model;
					data = reader.read(data, readCfg);
				}
				me.set('bufferData', data);
			}
			var dataLength = data.length;
			pageSize = parseInt(pageSize||dataLength);
			records = data;
			if(!isNaN(pageSize)) {
				pageNo = me.pageNo;
				if(dataLength>pageSize) {
					var start = (pageNo-1)*pageSize;
					var end = start+pageSize;
					records = data.slice(start, end);
				}
			}
			if(!Zsember.isArray(records)) {
				me.set('root', records);
			}
			me.set('data', records);
		}
		me._setPageInfo(pageNo, pageSize, totalItems);
		me.refresh();
		return data;
	},
	_setPageInfo: function(pageNo, pageSize, totalItems) {
		var me = this;
		me.set('pageNo', pageNo);
		me.set('pageSize', pageSize);
		me.set('isFirstPage', (pageNo==1));
		var totalPages = parseInt(totalItems/pageSize);
		if(totalItems%pageSize>0) {
			totalPages++;
		}
		me.set('totalItems', totalItems);
		me.set('totalPages', totalPages);
		me.set('isLastPage', (pageNo==totalPages));
	},
	setPageSize: function(pageSize) {
		var me = this;
		pageSize = parseInt(pageSize);
		me.set('pageNo', 1);
		me.set('pageSize', pageSize);
		me.load();
	},
	findPage: function(pageNo) {
		var me = this,
			totalPages = me.totalPages;
		pageNo = parseInt(pageNo);
		if(pageNo>totalPages) {
			pageNo = totalPages;
		}
		pageNo = (pageNo<1)? 1:pageNo;
		me.set('pageNo', pageNo);
		me.load();
	},
	doSort: function(sorter) {
		var me = this,
			data = me.data;		
		data = Zsember.Arrays.quickSort(data, sorter);
		me.trigger('refresh');
	},
	cleanFilters: function(filters) {
		var result = {};
		for(var f in filters) {
			var val = filters[f];
			if(val==undefined || val=='') {
				continue;
			}
			result[f] = val;
		}
		return result;
	},
	buildFilterFn: function(filters) {
		return function(data) {
			for(var f in filters) {
				if(data[f]!=filters[f]) {
					return false;
				}
			}
			return true;
		};
	},
	doFilter: function(filters) {
		var me = this,
			Arrays = Zsember.Arrays,
			data = me.bufferData||me.data;
		me.set('pageNo', 1);
		filters = me.cleanFilters(filters);
		var filterFn = me.buildFilterFn(filters);
		data = Arrays.quickFilter(data, filterFn);
		me.bindData(data, true);
	},
	getModel: function() {
		return this.model;
	},
	getNewRecords: function() {
		var me = this,
			data = me.data;
		var newRecords = [];
		for(var i=0;i<data.length;i++) {
			var d = data[i];
			if(!d.isModel || !d.getId()) {
				newRecords.push(d);
			}
		}
		return newRecords;
	},
	getUpdateRecords: function() {
		var me = this,
			data = me.data;
		var updateRecords = [];
		for(var i=0;i<data.length;i++) {
			var d = data[i];
			if(!d.isModel) {
				continue;
			}
			if(d.getId() && d.isDirty) {
				updateRecords.push(d);
			}
		}
		return updateRecords;
	},
	getRemoveRecords: function() {
		var me = this,
			data = me.data;
		var removeRecords = [];
		for(var i=0;i<data.length;i++) {
			var d = data[i];
			if(d.isDestroyed) {
				removeRecords.push(d);
			}
		}
		return removeRecords;			
	},	
	save: function(records) {
		var me = this;
		me.saveRecords(records);
		me.bindData(me.bufferData, true);
		me.refresh();
	},
	/**
	 * @protected - save records
	 */
	saveRecords: function(records) {		
		if(!records) {
			return records;
		}
		if(!Zsember.isArray(records)) {
			records = [records];
		}
		var me = this,
			data = me.data = me.data||[],
			bufferData = me.bufferData = me.bufferData||data;
		for(var i=0;i<records.length;i++) {
			var rec = records[i];
			if(!data.contains(rec)) {
				data.pushObject(rec);
			}
			if(bufferData && !bufferData.contains(rec)) {				
				bufferData.pushObject(rec);
			}
		}
	},	
	remove: function(records) {
		var me = this;			
		me.removeRecords(records);
		me.bindData(me.bufferData, true);
		me.refresh();
	},	
	/**
	 * @protected - remove data from store
	 */
	removeRecords: function(records) {
		if(!records) {
			return records;
		}
		if(!Zsember.isArray(records)) {
			records = [records];
		}
		var me = this,
			bufferData = me.bufferData,
			data = me.data;		
		for(var i=0;i<records.length;i++) {
			var rec = records[i];
			if(rec.destroy) {
				rec.destroy();
			}
		}
		data.removeObjects(records);
		if(bufferData) {
			bufferData.removeObjects(records);
		}
		return records;
	},
	refresh: function() {
		this.fireEvent('refresh');
	},	
	flush: function() {
		var me = this,
			newRecords = me.getNewRecords(),
			updateRecords = me.getUpdateRecords(),
			removeRecords = me.getRemoveRecords();
		if(newRecords) {
			me.save(newRecords.length);
		}
		if(updateRecords.length) {
			me.save(updateRecords);
		}
		if(removeRecords.length) {
			me.save(removeRecords);
		}		
	}	
});