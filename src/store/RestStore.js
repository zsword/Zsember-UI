/**
 * Rest Store
 * @author JemiZhuu(周士淳,ZSword)
 * @category store.RestStore
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('store.RestStore', {
	extend: Zsember.to('store.JsonStore'),
	prepareActionRequest: function(request, records) {
		var me = this,
			Actions = me.Actions,
			url = request.url, 
			action = request.action;
		var id = undefined;
		if(Zsember.isArray(records)) {
			if(records.length<2) {
				id = records[0].id;
			}
		} else {
			id = records.id;
		}		
		if(id) {
			url = url+'/'+id;			
		}		
		switch(action) {
		case Actions.SAVE:
			request.method = id? 'PUT' : 'POST';
			break;
		case Actions.REMOVE:
			request.method = 'DELETE';			
			break;
		}		
		request.url = url;
		return request;
	}
});