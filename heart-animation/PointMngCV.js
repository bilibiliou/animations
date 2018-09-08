/*
VERTICES POINT
*/

PointMngCV = ( function() {
  /*
  CONST
  */
  function PointMngCV( _v, _id, _obj ) {
    this._obj = _obj;
    
    this._count = 0;
    this._v = new THREE.Vector3( _v.x, _v.y, _v.z );
    this._trgV = new THREE.Vector3();
    this._currentV = new THREE.Vector3();

    //動かす頂点
    this.isAction = false;
    
    //半径
    this._rad = 0;
    
    this._baseRad = 66; //64;//66;
    
    //半径加算分
    this._adRad = 0; //20;
    this._adMax = Math.ceil( Math.random() * 30 );
    this._adSpeed = Math.random() * 2 + 1;
    
    this._adCount = 0;

    // 没有变形的时候
    this._rad = this._baseRad;

    var _deg = _id * 19;//15;//8;
    // var _tx = Math.cos( _deg * Math.PI / 180 ) * this._rad;
    // var _ty = Math.sin( _deg * Math.PI / 180 ) * this._rad;

    var vdeg = ((2 * Math.PI) / _obj._geo.vertices.length) * _id
    var _tx = 11 * 16 * Math.pow( Math.sin(vdeg) , 3);
    var _ty = 11 * (13 * Math.cos( vdeg ) - 5 * Math.cos( 2 * vdeg ) - 2 * Math.cos( 3 * vdeg ) - Math.cos( 4 * vdeg ));

    this._trgV.x = _tx;
    this._trgV.y = _ty;
    this._trgV.z = _id * 0.1;
    
    //** 当前的所有向量的坐标 */
    this._currentV.x = this._v.x;
    this._currentV.y = this._v.y;
    this._currentV.z = this._v.z;
    
    this._speedA = Math.random() * 18 * 0.01 + 0.08;
    this._speedB = 1 - this._speedA;
    
    this._speedC = Math.random() * 20 * 0.01 + 0.15;
    this._speedD = 1 - this._speedC;
  }
  
  
  PointMngCV.prototype.getPoint = function( isOver ) {
    if( isOver )
    {
      this._currentV.x = ( this._currentV.x * this._speedB ) + ( this._trgV.x * this._speedA );
      this._currentV.y = ( this._currentV.y * this._speedB ) + ( this._trgV.y * this._speedA );
      this._currentV.z = ( this._currentV.z * this._speedB ) + ( this._trgV.z * this._speedA );
    }
    else
    {
      this._currentV.x = ( this._currentV.x * this._speedD ) + ( this._v.x * this._speedC );
      this._currentV.y = ( this._currentV.y * this._speedD ) + ( this._v.y * this._speedC );
      this._currentV.z = ( this._currentV.z * this._speedD ) + ( this._v.z * this._speedC );
    }
    
    return this._currentV;
  }
  
  
  return PointMngCV;
  
} )();
