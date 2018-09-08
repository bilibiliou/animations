function pageJump(_url) {
  location.href = _url;
}

function $ (v, d) {
  d = d || document
  return d.querySelector(v)
}

function Main () {
  this._worksList = [
    /** 盒子id, 前缀背景, 后背景, 点击跳转链接 */
    ["box1", "texture26.jpg", "texture26.jpg", "http://www.baidu.com"]
  ]

  window.onload = function () {
    function initStats() {
      var stats = new Stats();
      stats.setMode(0);
      stats.domElement.style.position = 'absolute';
      stats.domElement.style.left = '0px';
      stats.domElement.style.top = '0px';
      $("#Stats-output").appendChild(stats.domElement);
      return stats;
    }
    stats = initStats()
    _main.load()
  }
}

Main.prototype.load = function() {
  //cover
  // this.isCover = true;
  // this._cover = new CanvasCover( "cover" );


  this._threeMain = new THREEMain( );
  for( var i = 0; i < this._worksList.length; i++ ) {
    this._threeMain.create( this._worksList[i][0],this._worksList[i][1],this._worksList[i][2],this._worksList[i][3] );
  }

  this._threeMain.start()
}

	// Main.prototype.modelComp = function()
	// {	
	// 	this._modelCount++;
		
	// 	if( this._modelCount >= this._worksList.length )
	// 	{	
	// 		this._timer = setTimeout( _main.modelCompTimer, 1000 );
	// 	}
	// }
	
	// Main.prototype.modelCompTimer = function()
	// {	
	// 	clearTimeout( _main._timer );
		
	// 	if( _main.isCover )
	// 	{
	// 		//coverあり
	// 		_main._cover.start();
	// 	}
	// 	else
	// 	{
	// 		//coverなし
	// 		_main.xAllReady();
	// 		_main.xAllStart();
	// 		//LOADING REMOVE
	// 		_main.removeLoading();
	// 	}
	// }

_main = new Main();