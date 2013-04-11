/**
 * Ajax Store
 * @author JemiZhuu(周士淳,ZSword)
 * @category store.AjaxStore
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('store.AjaxStore', {
	extend: Zsember.to('store.Store'),
	requires: Zsember.to(['utils.HttpAjax']),
	alias: 'store.ajax',
	reader: 'json',
	format: 'json',
	model: undefined,
	url: undefined,
	load: function(request) {
		var me = this,
			loadedFn = undefined,
			loadFailedFn = undefined;
		var url = me.url;
		var ajaxData = request && request.data;
		var pageParams = me.buildPageParams();
		if(pageParams) {
			ajaxData = Zsember.apply(ajaxData, pageParams);
		}
		var filterParams = me.buildFilterParams();
		if(filterParams) {
			ajaxData = Zsember.apply(ajaxData, filterParams);
		}		
		request = Zsember.apply({
			url: url,
			data: ajaxData,
			success: me.handleLoadSuccess,
			error: me.handleLoadFailed
		}, request);
		me.doRequest(request);
	},
	doRequest: function(request) {
		var me = this,
			HttpAjax = Zsember.HttpAjax,
			successCallback,
			errorCallback;
		if(request) {
			successCallback = request.success;
			delete request.success;
			errorCallback = request.error;
			delete request.error;
		}
		request.dataType = request.dataType||me.format;
		request = Zsember.apply(request, {
			success: function(data) {
				if(successCallback) {
					successCallback.apply(me, arguments);
				}
			},
			error: function(req, status, error) {
				if(errorCallback) {
					errorCallback.apply(me, arguments);
				}
			}
		});		
		HttpAjax.ajax(request);		
	},	
	saveRecords: function(records, request) {
		var me = this,
			url = me.url,
			action = me.Actions.SAVE;
		var data = records.isModel? records.getRaw() : records;		
		request = Zsember.apply({
			'action': action,
			'url': url,
			'data': data,
			'success': me.handleSaveSuccess,
			'method': 'POST'
		}, request);
		url = me.prepareActionUrl(request.url, records);
		request.url = url;
		me.prepareActionRequest(request, records);
		me.doRequest(request);
	},
	removeRecords: function(records, request) {
		var me = this,
			url = me.url;
		var action = me.Actions.DELETE;
		var params = {};
		if(Zsember.isArray(records)) {
			var ids = [];
			for(var i=0;i<records.length;i++) {
				var rec = records[i];
				var id = rec.id;
				ids.push(id);
			}
			params['ids'] = ids;
		} else {
			var id = records.id;
			params['id'] = id;
		}
		request = Zsember.apply({
			'action': action,
			'url': url,
			'data': params,
			'success': me.handleRemoveSuccess
		}, request);
		url = me.prepareActionUrl(request.url, action);
		request.url = url;
		me.prepareActionRequest(request, records);
		me.doRequest(request);
	},
	prepareActionUrl: function(url, action) {
		var me = this,
			actionsMapping = me.actionsMapping;
		var mapping = actionsMapping[action];
		if(mapping) {
			url = url+((url.indexOf('?')==-1? '?':'&'))+mapping;
		}
		return url;
	},
	prepareActionRequest: Zsember.EmptyFn,	
	handleLoadFailed: function(req, status, error) {
		alert('Load data error: '+error);
		throw error;
	},
	handleSaveSuccess: function(data) {
		var me = this;
		me.handleLoadSuccess.apply(me, arguments);
	},	
	handleRemoveSuccess: function(data) {
		var me = this;
		me.handleLoadSuccess.apply(me, arguments);
	},	
	buildPageParams: function() {
		var me = this,
			params = me.pageParams;
		if(!params) {
			return undefined;
		}		
		var page = {};
		page[params.pageNoParam] = me.pageNo;
		page[params.pageSizeParam] = me.pageSize;
		return page;
	},
	buildFilterParams: function() {
		var me = this,
			filters = me.filters;
		if(Zsember.isBlank(filters)) {
			return undefined;
		}
		return filters;
	}	
});