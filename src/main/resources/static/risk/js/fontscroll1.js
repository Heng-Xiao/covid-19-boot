/**
 +-------------------------------------------------------------------
 * FontScroll - 文字行向上滚动插件
 * 说明： 
 * 		本项目参考 https://gitee.com/kzm/FontScroll 项目修改而来，
 * 		初始化后会将ul复制一遍，因此可能会导致一些选择错误（如根据ul的id查询ul节点），需注意！
 * 		1.将jquery扩展件改成了独立组件（当然还是会依赖jquery），方便在同一页面里支持多个FontScroll；
 *		2.添加了新的参数进行控制（如speed、skip、pauseOnHover、startOnInit等）；
 *		3.添加了些的方法（启停、暂停继续、销毁等）；
 * 		4.计算偏移margin时，每行的高度单独计算，避免行高不一致导致的偏移问题；
 * 		5.添加elH、ulH的判断，动态计算偏移高度，支持滚动容器div动态修改高度；
 * 		6.添加动态增减li的方法，可以在运行中动态增减行数（但不推荐这么做）；
 * 		7.修复了原项目的一些bug；
 * 作者：konger123 （随枫的落叶 konger@126.com）
 * gitee：https://gitee.com/konger123/FontScroll
 * 
 * 原项目github：https://gitee.com/kzm/FontScroll
 * 原作者：kongzhim
 +-------------------------------------------------------------------
 * @version    1.0.1
 * @since      2020.09.05
 * @author     konger123 <konger@126.com>
 * @gitee     https://gitee.com/konger123/FontScroll
 +-------------------------------------------------------------------
 */
 
var FontScroll = (function() {
	
	/**
	 * 创建方法
	 * @param target 滚动目标div的ID或选择器
	 * @options 参数：
	 * 		time：每次滚动的时间间隔(单位：毫秒)，默认3000
	 * 		speed：滚动动画时间(单位：毫秒)，数值越小滚动动画速度越快，默认500
	 * 		rowClass：滚动选中行的样式，默认：fontColor
	 * 		num：滚动选中的行序号，默认：0 表示第一行
	 * 		skip：滚动时上面留白显示的行数，默认0
	 * 		pauseOnHover：鼠标经过时是否暂停，默认：true
	 *		startOnInit：初始化后是否自动运行，默认：true
	 * 		init：是否默认初始化，默认true
	 */
	var FontScroll = function(target, options) {
		var _this = this;
        this.version = '1.0.0 beta';
		this.defaults = {
            time: 3000,	//每次滚动的时间间隔(单位：毫秒)，默认3000
			speed: 500,	//滚动动画时间(单位：毫秒)，数值越小滚动动画速度越快，默认500
            rowClass: 'fontColor', //滚动选中行的样式，默认：fontColor
            num: 0,  //滚动时选中的行序号，默认：0 表示第一行
			skip: 0,	//滚动时上面留白显示的行数，默认0
            pauseOnHover: true,	//鼠标经过时是否暂停，默认：true
			startOnInit: true,	//初始化后是否自动运行，默认：true
			init: true,	//是否默认初始化
        };
        this.options = $.extend({}, this.defaults, options);
		if(this.options.speed>=this.options.time) {//防止给定的动画时间不足
			this.options.speed = this.options.time - 10;
		}
		
        this.target = target;
        this.el = (typeof target === 'string') ? $(target) : $(target);
		this.ul = this.el.children("ul").first();//ul对象
		this.li = this.ul.children('li');
		this.length = this.li.length;//li的个数
		this.elH = this.el.height();
		this.ulH = this.ul.height();
		this.ulClone = this.ul.clone();
		if(this.elH < this.ulH) {
			this.ulClone.show();
		} else {
			this.ulClone.hide();
		}
		this.ulClone.insertAfter(this.ul);
		this.liClone = this.ulClone.children("li");
		
        this.timeID = null;//timer的ID
		this.liArr = new Array();
		this.cursor = this.options.num;
		this.ulMargin = 0;
		this.inited = false;
		
		if(this.options.init) {
			this.init();
		}
		
		if(this.options.startOnInit) {
			this.start();
		}
	}
	
	/**
	 * 初始化
	 */
	FontScroll.prototype.init = function() {
		if(this.el==undefined || this.el==null) {
			throw new Error("初始化失败，对象是否已被销毁？请检查！");
		}
		
		this.li = this.ul.children('li');
		this.liClone = this.ulClone.children("li");
		this.length = this.li.length;
		
		this.elH = this.el.height();
		this.ulH = this.ul.height();
		if(this.elH >= this.ulH) {
			this.ulClone.hide();
		} else {
			this.ulClone.show();
		}
		this.liArr = new Array();
		for(var i=0; i<this.li.length; i++) {
			this.liArr.push($(this.li[i]));
		}
		for(var i=0; i<this.liClone.length; i++) {
			this.liArr.push($(this.liClone[i]));
		}

		this.li.removeClass(this.options.rowClass);
		this.liClone.removeClass(this.options.rowClass);
		
		this.cursor = this.options.num % this.length;
		this.liArr[this.cursor].addClass(this.options.rowClass);
		this.ulMargin = 0;
		if(this.ulH > this.elH) {
			for(var i=this.options.skip; i<this.liArr.length && i<this.cursor; i++) {
				this.ulMargin += this.liArr[i].outerHeight();
			}
			this.ul.animate({marginTop: (this.ulMargin==0 ? 0 : '-'+this.ulMargin)}, this.options.speed);
		}
		this.inited = true;
	}
	
	/**
	 * 更新参数
	 * @param options 新的参数
	 * @param immediatelyEffect 新参数是否立即生效
	 */
	FontScroll.prototype.updateOptions = function(options, immediatelyEffect) {
		this.options = $.extend({}, this.options, options);
		
		if(immediatelyEffect) {
			if(this.timeID!=null) {
				//如果正在运行的话，使新参数立即生效
				this.pause();
				this.resume();
			}
		}
	}
	
	/**
	 * 开始运行
	 */
	FontScroll.prototype.start = function() {
		if(this.timeID != null) {
			return;
		}
		if(this.li.length < 1) {
			return;
		}
		var _this = this;
		
		if(!this.inited) {
			this.init();
		}
		
		
		var timeID = setInterval(function() {
			_this.up(_this);
		}, _this.options.time);
		_this.timeID = timeID;
        
		if(_this.options.pauseOnHover) {
			_this.ul.hover(function(){
				clearInterval(_this.timeID);
				timeID = null;
				_this.timeID = timeID;
			},function(){
				timeID = setInterval(function() {
				_this.up(_this);
			}, _this.options.time);
				_this.timeID = timeID;
			});
		}
	}
	
	/**
	 * 向上滚动一行
	 * @param obj FontScroll对象，setInterval传参时使用
	 */
	FontScroll.prototype.up = function(obj) {
		if(!this.inited) {
			this.init();
			return;
		}
		
		var _this = obj || this;

		_this.li = _this.ul.children('li');
		_this.liClone = _this.ulClone.children("li");
		_this.length = _this.li.length;
		
		_this.elH = _this.el.height();
		_this.ulH = _this.ul.height();
		if(_this.elH < _this.ulH) {
			_this.ulClone.show();
		} else {
			_this.ulClone.hide();
		}
		
		_this.liArr = new Array();
		for(var i=0; i<_this.li.length; i++) {
			_this.liArr.push($(_this.li[i]));
		}
		for(var i=0; i<_this.liClone.length; i++) {
			_this.liArr.push($(_this.liClone[i]));
		}

		
		_this.cursor++;
		if(_this.cursor > _this.length + 1) {
			_this.cursor = 1;
		}
		_this.li.removeClass(_this.options.rowClass);
		_this.liClone.removeClass(_this.options.rowClass);
		
		_this.ulMargin = 0;
		if(_this.elH < _this.ulH) {//需要设置偏移
			for(var i=_this.options.skip; i<_this.liArr.length && i<_this.cursor; i++) {
				_this.ulMargin += _this.liArr[i].outerHeight();
			}
			_this.liArr[_this.cursor].addClass(_this.options.rowClass);
		}
		_this.liArr[_this.cursor % _this.length].addClass(_this.options.rowClass);
		
		if(_this.cursor > _this.length) {
			var oldCur = _this.cursor;
			_this.cursor = 1;
			var newMargin = 0;
			for(var i=_this.options.skip; i<_this.liArr.length && i<_this.cursor; i++) {
				newMargin += _this.liArr[i].outerHeight();
			}
			_this.liArr[1].addClass(_this.options.rowClass);
			_this.ul.animate({marginTop: (_this.ulMargin==0 ? 0 : '-'+_this.ulMargin)}, _this.options.speed, function() {
				_this.ulMargin = newMargin;
				_this.ul.animate({marginTop: (_this.ulMargin==0 ? 0 : '-'+_this.ulMargin)}, 0, function() {
					if(oldCur < _this.liArr.length) {
						_this.liArr[oldCur].removeClass(_this.options.rowClass);
					}
				});
			});
		} else {
			_this.ul.animate({marginTop: (_this.ulMargin==0 ? 0 : '-'+_this.ulMargin)}, _this.options.speed);
		}
	}
	
	/**
	 * 暂停
	 */
	FontScroll.prototype.pause = function() {
		if(this.options.pauseOnHover) {
			//取消hover事件
			this.ul.unbind('mouseenter').unbind('mouseleave');
		}
		if(this.timeID != null) {
			clearInterval(this.timeID);
			this.timeID = null;
		}
	}
	
	/**
	 * 继续
	 * @returns {Number} timeID
	 */
	FontScroll.prototype.resume = function() {
		if(this.timeID != null) {
			return;
		}
		var _this = this;
		
		var timeID = setInterval(function() {
			_this.up(_this);
		}, _this.options.time);
		_this.timeID = timeID;

		if(_this.options.pauseOnHover) {
			_this.ul.hover(function(){
				clearInterval(_this.timeID);
				timeID = null;
				_this.timeID = timeID;
			},function(){
				timeID = setInterval(function() {
				_this.up(_this);
			}, _this.options.time);
				_this.timeID = timeID;
			});
		}
        
        return timeID;
	}
	
	/**
	 * 停止
	 */
	FontScroll.prototype.stop = function() {
		var _this = this;

		if(_this.options.pauseOnHover) {
			//取消hover事件
			_this.ul.unbind('mouseenter').unbind('mouseleave');
		}
		if(_this.timeID != null) {
			clearInterval(_this.timeID);
			_this.timeID = null;
		}
		
		
		//_this.running = false;//运行状态
		_this.elH = _this.el.height();
		_this.ulH = _this.ul.height();
		if(_this.elH < _this.ulH) {
			_this.ulClone.show();
		}
		
		_this.li = _this.ul.children('li');
		_this.liClone = _this.ulClone.children("li");
		_this.length = _this.li.length;
		
		_this.elH = _this.el.height();
		_this.ulH = _this.ul.height();
		if(_this.elH >= _this.ulH) {
			_this.ulClone.hide();
		} else {
			_this.ulClone.show();
		}
		_this.liArr = new Array();

		_this.li.removeClass(_this.options.rowClass);
		_this.liClone.removeClass(_this.options.rowClass);
		_this.ul.animate({marginTop: '0'}, 0);
		
		_this.cursor = -1;
		_this.ulMargin = 0;
		_this.inited = false;
	}
	
	/**
	 * 销毁对象。销毁后对象会变成"{}"
	 */
	FontScroll.prototype.destroy = function() {
		this.stop();
		this.ulClone.remove();
		for(var a in this) {
			delete this[a];
		}
	}
	
	/**
	 * 添加li
	 * @param o 要添加的li对象。可以是"<li>...</li>"这样的字符串，也可以是dom对象
	 */
	FontScroll.prototype.addLi = function(o) {
		var dom = $(o);
		this.ul.append(dom);
		this.ulClone.append(dom.clone());
		
		this.li = this.ul.children('li');
		this.liClone = this.ulClone.children("li");
		this.length = this.li.length;
		if(this.cursor == this.length - 1) {
			this.cursor = 0;
		}
	}
	
	/**
	 * 移除li
	 * @param selector 要移除li的选择器。如"#li_1"、"li:first"、"li:last"、"li:eq(2)"等等
	 */
	FontScroll.prototype.removeLi = function(selector) {
		this.ul.children(selector).remove();
		this.ulClone.children(selector).remove();
		
		this.li = this.ul.children('li');
		this.liClone = this.ulClone.children("li");
		this.length = this.li.length;
		if(this.cursor == this.length - 1) {
			this.cursor = 0;
		}
	}
	
	return FontScroll;
}());