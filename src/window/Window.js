/**
 * Window
 * @author JemiZhuu(周士淳,ZSword)
 * @category window.Window
 * @version 0.1
 * @since 2013-4-11
 */
Zsember.defineNS('window.Window', {
	extend: 'Zsember.Component',
	requires: Zsember.to(['window.TitleBar']),	
	alias: 'widget.window',
	title: 'Windows for Zsember',	
	classNames: ['v-window'],
	iconCls: 'icon-window',
	status: 'window',
	_statusData: {},
	top: undefined,
	left: undefined,
	width: 600,
	height: 400,
	minWidth: 400,
	minHeight: 300,
	resizable: true,
	draggable: true,
	maximize: true,
	minimize: true,
	closable: true,
	lazyLoad: true,
	animation: {
		speed: 300,
		type: 'easeOutCubic'
	},
	borderWidth: 22,
	borderHeight: 62,
	borderMouseCursorSpacing: 25,
	titleHeight: 40,
	taskbarHeight: 40,
	items: undefined,
	_isMaximized: false,
	autoDestroy: true,
	styleBinds: ['width', 'height', 'top', 'left'],
	template: ['<table style="width:100%;height:100%;" cellspacing="0" cellpadding="0" border="0"><thead class="win-titlebar">',
	    '<tr><td class="table-tl"></td><td class="table-tm"></td><td class="table-tr"></td></tr>',
	    '<tr valign="top"><td class="table-lm"></td><td align="left" class="table-mm" {{bindAttr height="view.titleHeight"}}>',
	    '{{view view.titlebar}}',
	    '</td><td class="table-rm"></td></tr></thead>',
	    '<tbody><tr valign="top"><td class="table-lm"></td><td align="left" class="table-mm table-border">',
	    '<div align="left" class="win-content">{{view view.itemsView}}</div>',
	    '</td><td class="table-rm"></td></tr>',
	    '<tr><td class="table-bl"></td><td class="table-bm"></td><td class="table-br"></td></tr>',
	    '</tbody></table>'],
	initComponent: function() {
		var me = this,
			items = me.items;
		me.initTitlebar();
		me.itemsView = Zsember.widget({
			widget: 'container',
			classNames: 'win-main',
			items: items
		});
		me.addListeners({			
			'mousedown.activeWindow': function() {
				me.active();				
			},
			'dblclick.resizeWindow': {
				'handler': '.win-titlebar',			
				'fn': function() {
					var newSize = me.maximize? 'maximize' : 'restore';
					me.setWindowSize(newSize);					
				}			
			}			
		});
		me.callSuper();
	},
	initTitlebar: function() {
		var me = this;
		var titlebar = me.titlebar = Zsember.widget({
			widget: 'windowTitlebar',
			parentViewBinds: ['title', 'iconCls', 'icon', 'maximize', 'minimize', 'closable'],
			onButtonClick: function(btn, action) {
				me.executeAction(action);
			}
		});
		return titlebar;
	},
	onFirstRender: function() {
		var me = this;
		if(me.left==undefined || me.top==undefined) {
			me.center();
		}
		if(me.draggable) {
			me.setDraggable({
				'handle': '.win-titlebar',
		        'drag': function () {
		        	var view = $(this);
					var offset = view.offset();
					var winTop = -1 * offset.top;
					winLeft = -1 * offset.left;
					view.css({
						backgroundPosition: winLeft + 'px ' + winTop + 'px'
					});
				}				
			});
		}
		if(me.resizable) {
			me.setResizable({
				helper: "ui-resizable-helper",
				stop: function(ui, evt) {
					me.handleResize();
				}
			});
		}
		this.callSuper();
	},
	center: function() {
		var me = this,
			left = me.left,
			top = me.top,
			view = me.getView();
			parentView = me.getParentView();
		var pView = parentView? parentView.getView():view.parent();
		if(left==undefined) {
			left = (pView.width()-view.width())/2;
		}
		if(top==undefined) {
			top = (pView.height()-view.height())/2;
		}
		me.setPosition({left:left, top:top});
	},
	executeAction: function(action) {
		var me = this,
			actionFn = me[action];
		if(Zsember.isFunction(actionFn)) {
			return actionFn.apply(me);			
		}
	},
	max: function() {
		this.setWindowSize('maximize');		
	},
	min: function() {
		this.setWindowSize('minimize');
	},
	restore: function() {
		this.setWindowSize('restore');
	},
	show: function() {
		var me = this;
		me.active();
		me.callSuper();
	},
	active: function() {
		var view = this.getView();
		$('.v-window.active', view.parent()).removeClass('active');
		view.addClass('active');
	},	
	popup: function() {
		var view = this.getView();
		view.show();
	},
	setPosition: function(position) {
		this.setAttrs(position);
	},
	handleResize: function() {
		var me = this,
			itemsView = me.itemsView,
			items = itemsView.getChildViews();
		for(var i=0;i<items.length;i++) {
			items[i].fireEvent('onResize');
		}
	},
	_saveStatus: function() {
		var me = this,
			view = me.getView(),
			data = me._statusData;
    	data.height = view.height();
    	data.width = view.width();
    	var offset = view.offset(); 
    	data.top = offset.top;
    	data.left = offset.left;
	},
	setWindowSize: function (newSize, FocusWindow, WindowStatusBefore) {
		var me = this,
			win = me.getView(),
			animation = me.animation;
		if (me.status == 'window') {
			me._saveStatus();
		}
        me.statusBefore = me.status;
        me.active();
        switch (newSize) {
        case 'minimize':
            me.status = 'minimized';           
            win.animate({
                opacity: 'hide'
            }, {
                queue: true,
                duration: animation.speed,
                easing: animation.type
            });
            break;
        case 'maximize':
        	me.set('maximize', false);            
            win.animate({
                opacity: 'show'
            }, {
                queue: true,
                duration: animation.speed,
                easing: animation.type
            });
            win.draggable({disabled: true});
            win.resizable({disabled: true});
            var parent = win.parent();
            win.animate({
                width: '100%',
                height: '100%',
                top: 0,
                left: 0
            }, {
                duration: animation.speed,
                easing: animation.type
            });
            me.status = 'maximized';
            break;
        case 'restore':        	
        	me.set('maximize', true);
            me.status = 'window';
            win.animate({
                opacity: 'show'
            }, {
                queue: true,
                duration: animation.speed,
                easing: animation.type
            });
            var prevStatus = me._statusData;
            win.animate({
                opacity: 1,
                width: prevStatus.width,
                height: prevStatus.height,
                top: prevStatus.top,
                left: prevStatus.left
            }, {
                queue: true,
                duration: animation.speed,
                easing: animation.type
            });
            win.draggable('enable');
            win.resizable('enable');
            break;
        default:
            break;
        }
    }
});