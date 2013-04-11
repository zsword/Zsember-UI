/**
 * Sortable Mixin
 * @author JemiZhuu(周士淳,ZSword)
 * @category mixin.Sortable
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('mixin.Sortable', {
	isMixin: true,
    /**
     * @property {Boolean} isSortable
     * `true` in this class to identify an object as an instantiated Sortable, or subclass thereof.
     */
    isSortable: true,
    isMultiSort: false,
    defaultSortDirection: "ASC",
	comparators: {
		'default': function(v1, v2, field) {
			return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);			
		}
	},
	doSort: Zsember.EmptyFn,
	sort: function(sortBys, sortDirs, where, doSort) {
    	var me = this,
    		sortCfgs = undefined;
    	if (Zsember.isArray(sortBys)) {
    		doSort = where;
    		where = sortDirs;
    		sortCfgs = sortBys;            
    	} else if (sortBys.field) {
    		doSort = where;
    		where = sortDirs;
    		sortCfgs = [sortBys];
    	} else if (Zsember.isString(sortBys)) {
    		sortCfgs = {
        		field: sortBys,
        		sortDir: sortDirs
    		};
        	sortCfgs = [sortCfgs];
    	}
    	me.doSort(me.createDefaultSorter(sortCfgs));
    },   
    /**
     * @private - create comparators function
     */
    createDefaultSorter: function(sortCfgs) {
    	var me = this,
    		comparators = me.comparators;
        return function(obj1, obj2) {
        	var result = 0;        
        	for(var i=0;i<sortCfgs.length;i++) {
        		var cfg = sortCfgs[i];
        			field = cfg.field;
        			v1=obj1, v2=obj2;
        		if(field) {
        			v1 = obj1[field];
        			v2 = obj2[field];
        		}
        		var dir = cfg.sortDir;
        		for(var p in comparators) {
        			var compareFn = comparators[p];
        			result = result || (compareFn.call(this, v1, v2) * (dir=='DESC'?-1:1));
        			if(result) {
        				return result;
        			}
        		}
        		if(result) {
        			return result;
        		}
        	}
            return result;
        };
    }
});