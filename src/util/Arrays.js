/**
 * Arrays Module
 * @author JemiZhuu(周士淳,ZSword)
 * @version 0.1
 * @since 2013-4-11
 */
define(function(require, exports, module) {

var apply = $.extend;
var isFunction = $.isFunction;
function doQuickSort(arr, start, end, compareFn, dir){
	var args = arguments;
	if(!compareFn && !dir) {
		for(var i=0;i<args.length;i++) {
			var val = args[i];
			if(!compareFn && isFunction(val)) {
				compareFn = val;
				args[i] = undefined;
			} else if(!dir && (val=='ASC' || val=='DESC')) {
				dir = val;
				args[i] = undefined;
			}			
		}
	}
	dir = dir||'ASC';
	start = start||0,
	end = end||arr.length-1;
	if(start < end) {
		var par = partition(arr, start, end, compareFn, dir);
		if(par-1>start) {
			//递归调用快排
			doQuickSort(arr, start, par-1, compareFn, dir);
		}
		doQuickSort(arr, par+1, end, compareFn, dir);  
	}
	return arr;
}
function partition(arr, start, end, compareFn, dir) {
	var pivot = arr[end];  
	var i = start;
	for(var j=start; j<end; j++) {
		var result = false;
		if(arr[j]==pivot) {
			continue;
		}		
		if(compareFn) {
			result = compareFn(arr[j], pivot);
			result = (dir=='DESC')? result>0 : result<0;
		} else {
			result = (dir=='DESC')? (arr[j] > pivot) : (arr[j] < pivot);
		}
		if(result) {
			swap(arr, i, j);  
			i++;
		}
	}	
	swap(arr, i, end);
	return i;
}
function swap(arr, a, b) {
	var tmp = arr[a];   
	arr[a] = arr[b];  
	arr[b] = tmp;  
}
function binarySearch(arr, findVal, leftIndex, rightIndex) {
	leftIndex = leftIndex||0;
	rightIndex = rightIndex||(arr.length-1);
	if(leftIndex>rightIndex) {
		//not find element
		return -1;
	}
	//find middle
	var midIndex=Math.floor((leftIndex+rightIndex)/2);
	var midVal=arr[midIndex];
	//compare
	if(midVal>findVal){ 
		//find left
		return binarySearch(arr,findVal,leftIndex,midIndex-1);
	} else if(midVal<findVal) {
		//find right
		return binarySearch(arr,findVal,midIndex+1,rightIndex); 
	} else {
		//find element
		return midIndex;
	}
}
function doQuickFilter(arr, filterFn) {
	var result = [];
	for(var i=0;i<arr.length;i++) {
		var d = arr[i];
		if(filterFn(d)) {
			result.push(d);
		}		
	}
	return result;
}
var Arrays = {
	quickSort: function(data, compareFn, dir) {
		return doQuickSort(data, compareFn, dir);
	},
	quickFilter: function(data, filterFn) {
		return doQuickFilter(data, filterFn);
	},	
	binarySearch: function(data, findVal) {
		return binbinarySearch(data, findVal);
	}	
};
var arr = [];
for(var i=0;i<6;i++) {
	arr.push(Math.floor(Math.random()*100));
}
exports.Arrays = Arrays;
	
});