/*
	公用插件库
	
	Create Time : 2014-07-22
	Update Time : 2016-01-05
	Author      : trueland
	
	-------------------目录 -------------------
	
	★ 无缝滚动插件
	
	★ 下拉菜单
	
	★ 选项卡
	
	★ placeholder 兼容处理

	★ 浏览器版本接口
	
	★ 图片懒加载 LazyLoad Xt || Default Class : .lazy-hidden
	
	-------------------------------------------
*/

;(function($){
	
	/*
		----------------------------------------------------------------------------------------
		无缝滚动插件  HOW TO USE :
		$("#marquee-main").kxbdMarquee({
			
			isEqual:true,//所有滚动的元素长宽是否相等,true,false
			loop: 0,//循环滚动次数，0时无限
			direction: 'left',//滚动方向，'left','right','up','down'
			scrollAmount:1,//步长
			scrollDelay:25,//时长
			newAmount:3,//加速滚动的步长
			eventA:'mousedown',//鼠标事件，加速
			eventB:'mouseup'//鼠标事件，原速

		});
		----------------------------------------------------------------------------------------
	
	*/
	
	$.fn.kxbdMarquee = function(options){
		var opts = $.extend({},$.fn.kxbdMarquee.defaults, options);
		
		return this.each(function(){
			var $marquee = $(this);//滚动元素容器
			var _scrollObj = $marquee.get(0);//滚动元素容器DOM
			var scrollW = $marquee.width();//滚动元素容器的宽度
			var scrollH = $marquee.height();//滚动元素容器的高度
			var $element = $marquee.children(); //滚动元素
			var $kids = $element.children();//滚动子元素
			var scrollSize=0;//滚动元素尺寸
			var _type = (opts.direction == 'left' || opts.direction == 'right') ? 1:0;//滚动类型，1左右，0上下

			//防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
			$element.css(_type?'width':'height',10000);
			//获取滚动元素的尺寸
			if (opts.isEqual) {
				scrollSize = $kids[_type?'outerWidth':'outerHeight']() * $kids.length;
			}else{
				$kids.each(function(){
					scrollSize += $(this)[_type?'outerWidth':'outerHeight']();
				});
			}
			//滚动元素总尺寸小于容器尺寸，不滚动
			if (scrollSize<(_type?scrollW:scrollH)) return; 
			//克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
			$element.append($kids.clone()).css(_type?'width':'height',scrollSize*2);
			
			var numMoved = 0;
			function scrollFunc(){
				var _dir = (opts.direction == 'left' || opts.direction == 'right') ? 'scrollLeft':'scrollTop';
				if (opts.loop > 0) {
					numMoved+=opts.scrollAmount;
					if(numMoved>scrollSize*opts.loop){
						_scrollObj[_dir] = 0;
						return clearInterval(moveId);
					} 
				}
				if(opts.direction == 'left' || opts.direction == 'up'){
					var newPos = _scrollObj[_dir] + opts.scrollAmount;
					if(newPos>=scrollSize){
						newPos -= scrollSize;
					}
					_scrollObj[_dir] = newPos;
				}else{
					var newPos = _scrollObj[_dir] - opts.scrollAmount;
					if(newPos<=0){
						newPos += scrollSize;
					}
					_scrollObj[_dir] = newPos;
				}
			};
			//滚动开始
			var moveId = setInterval(scrollFunc, opts.scrollDelay);
			//鼠标划过停止滚动
			$marquee.hover(
				function(){
					clearInterval(moveId);
				},
				function(){
					clearInterval(moveId);
					moveId = setInterval(scrollFunc, opts.scrollDelay);
				}
			);
			
			//控制加速运动
			if(opts.controlBtn){
				$.each(opts.controlBtn, function(i,val){
					$(val).bind(opts.eventA,function(){
						opts.direction = i;
						opts.oldAmount = opts.scrollAmount;
						opts.scrollAmount = opts.newAmount;
					}).bind(opts.eventB,function(){
						opts.scrollAmount = opts.oldAmount;
					});
				});
			}
		});
	};
	$.fn.kxbdMarquee.defaults = {
		isEqual:true,//所有滚动的元素长宽是否相等,true,false
		loop: 0,//循环滚动次数，0时无限
		direction: 'left',//滚动方向，'left','right','up','down'
		scrollAmount:1,//步长
		scrollDelay:25,//时长
		newAmount:3,//加速滚动的步长
		eventA:'mousedown',//鼠标事件，加速
		eventB:'mouseup'//鼠标事件，原速
	};
	
	$.fn.kxbdMarquee.setDefaults = function(settings) {
		$.extend( $.fn.kxbdMarquee.defaults, settings );
	};
	
	/*
		--------------------------------------------------------------------------------------------------
		下拉菜单 HOW TO USE :
		$.dropdpwn_Menu(".nav > ul > li > ul");

		选项卡 	 HOW TO USE :
		$.easy_Tab(".tabHead",".tabCont","click","li","active"); 
		--------------------------------------------------------------------------------------------------
	*/

	$.extend({

		'dropdpwn_Menu' : function(nName){

			$(nName).css('display','none');
			$(nName).parent('li').hover(function() {
				$(this).children(nName).stop(true, true).slideDown(200);
			}, function() {
				$(this).children(nName).stop(true, true).slideUp(200);
			});

			return this;
		},

		'easy_Tab' : function(tHead,tConn,tType,childEleName,activeName){

			$(tHead).children(childEleName).bind(tType, function() {

				var index = $(this).index();
                $(this).addClass(activeName).siblings().removeClass(activeName);
                $(tConn).children(childEleName).eq(index).stop().fadeIn('500').siblings().hide();
	
			});

            return this;
		}
		
	})
	
})(jQuery);

	/*
		-------------------------------------------------------------------------------------
		placeholder 兼容处理 默认调用 创建的类是 : placeholder
		-------------------------------------------------------------------------------------
	*/

	if (!('placeholder' in document.createElement('input'))) {

		$('input[placeholder],textarea[placeholder]').each(function() {
			var that = $(this),
				text = that.attr('placeholder');
			if (that.val() === "") {
				that.val(text).addClass('placeholder');
			}
			that.focus(function() {
				if (that.val() === text) {
					that.val("").removeClass('placeholder');
				}
			}).blur(function() {
				if (that.val() === "") {
					that.val(text).addClass('placeholder');
		        }    
		    }).closest('form').submit(function(){    
		        if(that.val() === text){    
		          that.val('');    
		        }    
		   	});    
		});    
		
	}

	/*
		----------------------------------------------------------------------------------------
		浏览器版本接口
		使用： 
		if (getIEVersion() == "IE8") alert("yes!");
		----------------------------------------------------------------------------------------
	*/

	function getIEVersion(){

		if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") { 
			return "IE6";
		} 

		else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") { 
			return "IE7";
		} 

		else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") { 
			return "IE8";
		} 

		else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") { 
			return "IE9";
		} 

	}
	
	
	
	/*
		----------------------------------------------------------------------------------------
		图片懒加载 
		使用： <img data-src="Your Img Url" />
			默认会动态给 img 添加 .lazy-hidden 类 
		----------------------------------------------------------------------------------------
	*/
	(function ($, window, document, undefined) {
	    // options
	    var lazyLoadXT = 'lazyLoadXT',
	        dataLazied = 'lazied',
	        load_error = 'load error',
	        classLazyHidden = 'lazy-hidden',
	        docElement = document.documentElement || document.body,
	    //  force load all images in Opera Mini and some mobile browsers without scroll event or getBoundingClientRect()
	        forceLoad = (window.onscroll === undefined || !!window.operamini || !docElement.getBoundingClientRect),
	        options = {
	            autoInit: true, // auto initialize in $.ready
	            selector: 'img[data-src]', // selector for lazyloading elements
	            blankImage: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
	            throttle: 99, // interval (ms) for changes check
	            forceLoad: forceLoad, // force auto load all images
	
	            loadEvent: 'pageshow', // check AJAX-loaded content in jQueryMobile
	            updateEvent: 'load orientationchange resize scroll touchmove focus', // page-modified events
	            forceEvent: '', // force loading of all elements
	
	            //onstart: null,
	            oninit: {removeClass: 'lazy'}, // init handler
	            onshow: {addClass: classLazyHidden}, // start loading handler
	            onload: {removeClass: classLazyHidden, addClass: 'lazy-loaded'}, // load success handler
	            onerror: {removeClass: classLazyHidden}, // error handler
	            //oncomplete: null, // complete handler
	
	            //scrollContainer: undefined,
	            checkDuplicates: true
	        },
	        elementOptions = {
	            srcAttr: 'data-src',
	            edgeX: 0,
	            edgeY: 0,
	            visibleOnly: true
	        },
	        $window = $(window),
	        $isFunction = $.isFunction,
	        $extend = $.extend,
	        $data = $.data || function (el, name) {
	            return $(el).data(name);
	        },
	    // $.contains is not included into DOMtastic, so implement it there
	        $contains = $.contains || function (parent, el) {
	            while (el = el.parentNode) {
	                if (el === parent) {
	                    return true;
	                }
	            }
	            return false;
	        },
	        elements = [],
	        topLazy = 0,
	    /*
	     waitingMode=0 : no setTimeout
	     waitingMode=1 : setTimeout, no deferred events
	     waitingMode=2 : setTimeout, deferred events
	     */
	        waitingMode = 0;
	
	    $[lazyLoadXT] = $extend(options, elementOptions, $[lazyLoadXT]);
	
	    /**
	     * Return options.prop if obj.prop is undefined, otherwise return obj.prop
	     * @param {*} obj
	     * @param {*} prop
	     * @returns *
	     */
	    function getOrDef(obj, prop) {
	        return obj[prop] === undefined ? options[prop] : obj[prop];
	    }
	
	    /**
	     * @returns {number}
	     */
	    function scrollTop() {
	        var scroll = window.pageYOffset;
	        return (scroll === undefined) ? docElement.scrollTop : scroll;
	    }
	
	    /**
	     * Add new elements to lazy-load list:
	     * $(elements).lazyLoadXT() or $(window).lazyLoadXT()
	     *
	     * @param {object} [overrides] override global options
	     */
	    $.fn[lazyLoadXT] = function (overrides) {
	        overrides = overrides || {};
	
	        var blankImage = getOrDef(overrides, 'blankImage'),
	            checkDuplicates = getOrDef(overrides, 'checkDuplicates'),
	            scrollContainer = getOrDef(overrides, 'scrollContainer'),
	            elementOptionsOverrides = {},
	            prop;
	
	        // empty overrides.scrollContainer is supported by both jQuery and Zepto
	        $(scrollContainer).on('scroll', queueCheckLazyElements);
	
	        for (prop in elementOptions) {
	            elementOptionsOverrides[prop] = getOrDef(overrides, prop);
	        }
	
	        return this.each(function (index, el) {
	            if (el === window) {
	                $(options.selector).lazyLoadXT(overrides);
	            } else {
	                // prevent duplicates
	                if (checkDuplicates && $data(el, dataLazied)) {
	                    return;
	                }
	
	                var $el = $(el).data(dataLazied, 1);
	
	                if (blankImage && el.tagName === 'IMG' && !el.src) {
	                    el.src = blankImage;
	                }
	
	                // clone elementOptionsOverrides object
	                $el[lazyLoadXT] = $extend({}, elementOptionsOverrides);
	
	                triggerEvent('init', $el);
	
	                elements.push($el);
	            }
	        });
	    };
	
	
	    /**
	     * Process function/object event handler
	     * @param {string} event suffix
	     * @param {jQuery} $el
	     */
	    function triggerEvent(event, $el) {
	        var handler = options['on' + event];
	        if (handler) {
	            if ($isFunction(handler)) {
	                handler.call($el[0]);
	            } else {
	                if (handler.addClass) {
	                    $el.addClass(handler.addClass);
	                }
	                if (handler.removeClass) {
	                    $el.removeClass(handler.removeClass);
	                }
	            }
	        }
	
	        $el.trigger('lazy' + event, [$el]);
	
	        // queue next check as images may be resized after loading of actual file
	        queueCheckLazyElements();
	    }
	
	
	    /**
	     * Trigger onload/onerror handler
	     * @param {Event} e
	     */
	    function triggerLoadOrError(e) {
	        triggerEvent(e.type, $(this).off(load_error, triggerLoadOrError));
	    }
	
	
	    /**
	     * Load visible elements
	     * @param {bool} [force] loading of all elements
	     */
	    function checkLazyElements(force) {
	        if (!elements.length) {
	            return;
	        }
	
	        force = force || options.forceLoad;
	
	        topLazy = Infinity;
	
	        var viewportTop = scrollTop(),
	            viewportHeight = window.innerHeight || docElement.clientHeight,
	            viewportWidth = window.innerWidth || docElement.clientWidth,
	            i,
	            length;
	
	        for (i = 0, length = elements.length; i < length; i++) {
	            var $el = elements[i],
	                el = $el[0],
	                objData = $el[lazyLoadXT],
	                removeNode = false,
	                visible = force,
	                topEdge;
	
	            // remove items that are not in DOM
	            if (!$contains(docElement, el)) {
	                removeNode = true;
	            } else if (force || !objData.visibleOnly || el.offsetWidth || el.offsetHeight) {
	
	                if (!visible) {
	                    var elPos = el.getBoundingClientRect(),
	                        edgeX = objData.edgeX,
	                        edgeY = objData.edgeY;
	
	                    topEdge = (elPos.top + viewportTop - edgeY) - viewportHeight;
	
	                    visible = (topEdge <= viewportTop && elPos.bottom > -edgeY &&
	                        elPos.left <= viewportWidth + edgeX && elPos.right > -edgeX);
	                }
	
	                if (visible) {
	                    triggerEvent('show', $el);
	
	                    var srcAttr = objData.srcAttr,
	                        src = $isFunction(srcAttr) ? srcAttr($el) : el.getAttribute(srcAttr);
	                    if (src) {
	                        $el.on(load_error, triggerLoadOrError);
	                        el.src = src;
	                    }
	
	                    removeNode = true;
	                } else {
	                    if (topEdge < topLazy) {
	                        topLazy = topEdge;
	                    }
	                }
	            }
	
	            if (removeNode) {
	                elements.splice(i--, 1);
	                length--;
	            }
	        }
	
	        if (!length) {
	            triggerEvent('complete', $(docElement));
	        }
	    }
	
	
	    /**
	     * Run check of lazy elements after timeout
	     */
	    function timeoutLazyElements() {
	        if (waitingMode > 1) {
	            waitingMode = 1;
	            checkLazyElements();
	            setTimeout(timeoutLazyElements, options.throttle);
	        } else {
	            waitingMode = 0;
	        }
	    }
	
	
	    /**
	     * Queue check of lazy elements because of event e
	     * @param {Event} [e]
	     */
	    function queueCheckLazyElements(e) {
	        if (!elements.length) {
	            return;
	        }
	
	        // fast check for scroll event without new visible elements
	        if (e && e.type === 'scroll' && e.currentTarget === window) {
	            if (topLazy >= scrollTop()) {
	                return;
	            }
	        }
	
	        if (!waitingMode) {
	            setTimeout(timeoutLazyElements, 0);
	        }
	        waitingMode = 2;
	    }
	
	
	    /**
	     * Initialize list of hidden elements
	     */
	    function initLazyElements() {
	        $window.lazyLoadXT();
	    }
	
	
	    /**
	     * Loading of all elements
	     */
	    function forceLoadAll() {
	        checkLazyElements(true);
	    }
	
	
	    /**
	     * Initialization
	     */
	    $(document).ready(function () {
	        triggerEvent('start', $window);
	
	        $window
	            .on(options.loadEvent, initLazyElements)
	            .on(options.updateEvent, queueCheckLazyElements)
	            .on(options.forceEvent, forceLoadAll);
	
	        $(document).on(options.updateEvent, queueCheckLazyElements);
	
	        if (options.autoInit) {
	            initLazyElements(); // standard initialization
	        }
	    });
	
	})(window.jQuery || window.Zepto || window.$, window, document);