
World = ( function() {	
	function World( _op ) {
		this._objMng;

		this.isOver = true;
    this.isAction = true;

    // canvas 父级Id, 前景图片, 后景图片, 点击跳转的URL
		this._parent = _op._parent;
		this._id = _op._id;
		this._bmd1 = _op._bmd1;
		this._bmd2 = _op._bmd2;
		this._url = _op._url;

    /** 获取图片的 舞台宽高 */
		this._stageWidth = document.getElementById( this._id ).getBoundingClientRect().width;
		this._stageHeight = document.getElementById( this._id ).getBoundingClientRect().height;
		
		// camera 设置
		this._fov = 45;
		this._far = 2000;
		this._near = 1;
		this.init();
	}
	/*
	INIT
	*/
	World.prototype.init = function() {
		//if ( !Detector.webgl ) isWebGL = false;
		isWebGL = false;
		
		var _this = this;
		this._meshParentList = [];

		this.initEngine();
		this.initRender();

		//RESIZE
		// if( isFullScreen )
		// {
		// 	window.onresize = function( e )
		// 	{
		// 		return _this.onResize( e );
		// 	};
			
		// 	this.onResize( );
		// }
			
		// 模型生成管理
		this._objMng = new ObjectMngCV( this );
		
		this.createModel( );

		var self = this;
		document.querySelector( String( "#" + self._id ) ).addEventListener('mouseenter',
			function() {
				document.body.style.cursor = "pointer";
				self.mOver( );
			},
    );

		document.querySelector( String( "#" + self._id ) ).addEventListener('mouseout', function() {
      document.body.style.cursor = "default";
      self.mOut( );
    })

    // 点击后页面跳转
    document.querySelector( String( "#" + self._id ) )
      .addEventListener('click', function() { 
        pageJump( self._url )
      });

		// this._parent.modelComp();
	}

	/*
	OVER
	*/
	World.prototype.mOver = function() {
		if( !this.isOver )
		{
			this.isOver = true;
			this.isAction = true;
		}
	}
	
	World.prototype.mOut = function() {
		if( this.isOver )
		{
			this.isOver = false;
		}
	}
	
	
	
	/*
	*/
	World.prototype.animeEnd = function()
	{
		this.isAction = false;
	}
	
	
		
	/*
	ENGINE
	*/
	World.prototype.initEngine = function()
	{
		this._container = document.createElement( 'div' );
		document.getElementById( this._id ).appendChild( this._container );
		
		//camera
		this._cam = new THREE.PerspectiveCamera( this._fov, this._stageWidth / this._stageHeight, this._near, this._far );
		// this._cam.position.z = 496;
    this._cam.position.z = 30

		if( !isWebGL ) {
			this._cam.position.z = 494;
		}

		//scene
    this._scene = new THREE.Scene();
    this._cam.lookAt(this._scene.position);
    
	}
		
		
	/*
	INIT RENDER
	*/
	World.prototype.initRender = function( )
	{
		//RENDER-------------------------------------------------------------------------------------------
    this._render = new THREE.WebGLRenderer();
    this._render.setClearColor(0xffc0cb, 1)

		this._render.setSize( this._stageWidth, this._stageHeight );
		this._container.appendChild( this._render.domElement );
	}

	/*
	模型生成
	*/
	World.prototype.createModel = function() {
		this._objMng.createPlane();
	}

	/*
	 Mesh追加
	*/
	World.prototype.addMesh = function( _mesh, _obj ) {	
		//3d mesh
		this._scene.add( _mesh );
		
		if( _obj != null || _obj != undefined ) {
			this._meshParentList.push( _obj );
		}
		
		this._render.render( this._scene, this._cam );
	}

		
		
	/*
	RENDER
	*/
	World.prototype.onEnterFrame = function() {
		if( this.isAction ) {	
			var _leng = this._meshParentList.length;
		
			for( var i = 0; i < _leng; i++ )
			{
				this._meshParentList[i].onEnterFrame();
			}

			this._render.render( this._scene, this._cam );
		}
	}
		
		
	/*
	RESIZE
	*/
	World.prototype.onResize = function( e )
	{
		if(typeof e === "undefined"){ e = null; }
			
		this._stageWidth = window.innerWidth;
		this._stageHeight = window.innerHeight;
			
		this._cam.aspect = this._stageWidth / this._stageHeight;
		this._cam.updateProjectionMatrix();
		this._render.setSize( this._stageWidth, this._stageHeight );
	}

	return World;
		
} )();









