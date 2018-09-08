ObjectMngCV = ( function() {

	function ObjectMngCV( _world ) {
		this._world = _world;

		// 表示用オブジェクト(静止時)
		this._geoCov;
		this._meshCov;
		
		// 表示用オブジェクト(変形)
		this._geo;
		this._mesh;
			
		// Text 对象
		this._geoText;
		this._meshText;
			
		// Raycast 对象
		this._geoRay;
		this._meshRay;

		// 分段数 每一段分为2个Vector3
		// this._segW = 6; //8;
    // this._segH = 4;
    this._segW = 12;
    this._segH = 6;

		this._count = 0;
		this._rz = 0;

		this._vList = [];
	}

	/*
	 加载前置背景的纹理
	*/
	ObjectMngCV.prototype.createPlane = function() {
		var _this = this;

		new THREE.TextureLoader()
    .load(
      this._world._bmd1,
      // 资源加载完成后的回调函数
      function(texture) { _this.loadCompPlane(texture) }
    );
	}

	/*
	  根据加载的材质，生成完整的平面形状
	*/
	ObjectMngCV.prototype.loadCompPlane = function( texture ) {
    var map = texture;
    // 纹理的重复方式
		map.wrapS = map.wrapT = THREE.RepeatWrapping;

		var _op = {
			// ambient: 0xFFFFFF,
			color:0xffffff,
			side:THREE.DoubleSide,
      map: map, // 设置纹理贴图。
      wireframe: false,
			transparent:true,
			opacity:1,
			overdraw:0.5
		};
			
		var _material = new THREE.MeshBasicMaterial( _op );
    //var _material = new THREE.MeshLambertMaterial( _op );
    /** 网孔材质 */
		// var _material = new THREE.MeshPhongMaterial( _op );
		
		// 平面集合体 由 2个 Vector3 组成
		this._geo = new THREE.PlaneGeometry( this._world._stageWidth, this._world._stageHeight, this._segW, this._segH );
		this._geo.dymanic = true;
		this._mesh = new THREE.Mesh( this._geo, _material );
		
		////
		// hover 后形成的节点
		for( var i = 0; i < this._geo.vertices.length; i++ ) {
			 var _v = new PointMngCV( this._geo.vertices[i], i, this );
			 this._vList.push( _v );
		}
		
		this._world.addMesh( this._mesh, this );

    // 加载后缀背景
    // this.createBackgroundPlane();
    // this.createTextPlane();
	}

	/*
	TEXT FRAME
	*/
	ObjectMngCV.prototype.createBackgroundPlane = function() {
    var self = this

    new THREE.TextureLoader()
      .load(this._world._bmd2, function ( map ) {
        map.wrapS = map.wrapT = THREE.RepeatWrapping;
        var _op = {
          color: 0xFFFFFF,
    			side:THREE.DoubleSide,
          map: map,
          wireframe: false,
          transparent: true,
          opacity: 0,
          overdraw:0.5
        };

        var _material = new THREE.MeshBasicMaterial( _op );
        self._geoText = new THREE.PlaneGeometry( self._world._stageWidth, self._world._stageHeight, 1, 1 );

        self._meshText = new THREE.Mesh( self._geoText, _material );
        self._world.addMesh( self._meshText, null );
        self._meshText.position.z = -100;
      })
  }
  
  ObjectMngCV.prototype.createTextPlane = function () {
    var self = this
    var floader = new THREE.FontLoader()
      .load('XIAOMEIJW_Regular.json', function (text) {
        var textMaterial = new THREE.MeshBasicMaterial({wireframe: false})
        var textGeometry = new THREE.TextGeometry("各位幸苦啦\n 手动比心！", {
          depth: 0.1,
          //steps: 1,
          font: text,
          size: 8,
          height: 1.5,
          curveSegments: 12,
          bevelEnabled: false,
          bevelThinkness: 10,
          bevelSize: 8,
          bevelSegments: 3,
          transparent: true
        })

        self._meshText = new THREE.SceneUtils.createMultiMaterialObject(textGeometry, textMaterial);
        // self._meshText.position.set(0, Math.abs(textGeometry.boundingBox.min.y), 0);
        self._world.addMesh( self._meshText, null );
      })
  }
		
		
	/*
	ENTER FRAME
	*/
	ObjectMngCV.prototype.onEnterFrame = function( ) {
		// if( _device != "PC" ) {
		// 	return;
		// }

		var i;
		var leng = this._geo.vertices.length;
		
		
		if( this._world.isOver )
		{	
			this._rz += 0.5;
				
			if( this._rz >= 360 )
			{
				this._rz = 0;
			}

			// this._mesh.rotation.z = this._rz * Math.PI / 180;
			this._mesh.position.z = ( this._mesh.position.z * 0.65 ) + ( 10 * 0.15 );
			this._mesh.material.opacity = ( this._mesh.material.opacity * 0.65 ) + ( 0.5 * 0.15 );

      for( i = 0; i < leng; i++ ) {
				var _nv = this._vList[i].getPoint( true );
				this._geo.vertices[i].x = _nv.x;
				this._geo.vertices[i].y = _nv.y;
				this._geo.vertices[i].z = _nv.z;
			}
			
			
			// this._meshText.material.opacity += 0.05;
			
			// if( this._meshText.material.opacity >= 1 ) {
			// 	this._meshText.material.opacity = 1;
			// }
			
			//this._meshText.position.z = ( this._meshText.position.z * 0.85 ) + ( -10 * 0.15 );
			// this._meshText.position.z = ( this._meshText.position.z * 0.85 ) + ( 0 * 0.15 );
		}
		else
		{	
			this._rz = 0;
			this._mesh.rotation.z = ( this._mesh.rotation.z * 0.85 ) + ( 0 * 0.15 );
			this._mesh.position.z = ( this._mesh.position.z * 0.85 ) + ( 0 * 0.15 );
			this._mesh.material.opacity = ( this._mesh.material.opacity * 0.85 ) + ( 1 * 0.15 );
			
			
			for( i = 0; i < leng; i++ ) {
				var _nv = this._vList[i].getPoint( false );
				this._geo.vertices[i].x = _nv.x;
				this._geo.vertices[i].y = _nv.y;
				this._geo.vertices[i].z = _nv.z;
			}
			
			// this._meshText.material.opacity -= 0.05;
			
			// if( this._meshText.material.opacity <= 0 ) {
			// 	this._meshText.material.opacity = 0;
			// }
			
			
			// this._meshText.position.z = ( this._meshText.position.z * 0.92 ) + ( -100 * 0.08 );
			
			// if( Math.abs( this._meshText.position.z - ( -100 ) ) < 1 )
			// {
			// 	this._world.animeEnd();
			// }
		}
		
		this._geo.verticesNeedUpdate = true;
	}
	
	
	return ObjectMngCV;
	
} )();