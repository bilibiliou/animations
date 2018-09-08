var isFullScreen = false;
var isWebGL = false;

THREEMain = ( function() {
	/*
	CONST
	*/
	function THREEMain() {
    /** 存储 图片Hover实例栈 */
		this._worldList = [];
  }

	/*
	INIT
	*/
	THREEMain.prototype.create = function( _id, _bmd1, _bmd2, _url ) {
    var _op = {};
    // canvas 父级Id, 前景图片, 后景图片, 点击跳转的URL
		_op._parent = this;
		_op._id = _id;
		_op._bmd1 = _bmd1;
		_op._bmd2 = _bmd2;
		_op._url = _url;
		
		var _world = new World( _op );
		this._worldList.push( _world );
	}
	
	
	/*
	START
	*/
	THREEMain.prototype.start = function() {
		this.onEnterFrame( );
	}
	
	
	/*
	モデルが作られたら
	*/
	THREEMain.prototype.modelComp = function() {
		_main.modelComp();
	}
	
		
	/*
	ENTER FRAME
	*/
	THREEMain.prototype.onEnterFrame = function() {
		var self = this;
		requestAnimationFrame(function () {
      self.onEnterFrame.apply( self )
      stats.update();
    });
		var _len = this._worldList.length;
		
		for( var i = 0; i < _len; i++ ) {
			this._worldList[i].onEnterFrame( );
		}
	}
	
	
	return THREEMain;

})()