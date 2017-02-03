// 缓动函数 参数t 为当前 已运动的时间 / 运动完成所需的总时间
// return 已经运动完成的百分比
export const linear = (t) => t;
export const easeInQuad = (t) => t*t;
export const easeOutQuad = (t) => t*(2-t);
export const easeInCubic = (t) => t*t*t;
export const easeOutCubic = (t) => (--t)*t*t+1;
export const easeInOutCubic = (t) => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
export const easeInQuart = (t) => t*t*t*t;
export const easeInQuint = (t) => t*t*t*t*t;
export const inSine = (t) => 1 - Math.cos(t * Math.PI / 2 );
export const inExpo = (t) => 0 === t ? 0 : Math.pow(1024, t - 1);
export const inCirc = (t) => 1 - Math.sqrt(1 - t * t);
export const inBack = (t) => {
    let s = 1.70158;
    return t * t * (( s + 1 ) * t - s);
}
export const outBack = (t) => {
    let s = 1.70158;
    return --t * t * ((s + 1) * t + s) + 1;
}
export const inOutBack = (t) => {
    let s = 1.70158 * 1.525;
    if (( t *= 2 ) < 1 ) return 0.5 * ( t * t * ( ( s + 1 ) * t - s ) );
    return 0.5 * (( t -= 2 ) * t * (( s + 1 ) * t + s ) + 2 );
}
export const outBounce = (t) => {
    if (t < ( 1 / 2.75 ) ) {
        return 7.5625 * t * t;
    } else if (t < ( 2 / 2.75 )) {
        return 7.5625 * (t -= ( 1.5 / 2.75 )) * t + 0.75;
    } else if (t < ( 2.5 / 2.75 )) {
        return 7.5625 * (t -= ( 2.25 / 2.75 )) * t + 0.9375;
    } else {
        return 7.5625 * (t -= ( 2.625 / 2.75 )) * t + 0.984375;
    }
}
export const inElastic = (t) => {
    let s, a = 0.1, p = 0.4;
    if ( t === 0 ) return 0;
    if ( t === 1 ) return 1;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
    return - ( a * Math.pow( 2, 10 * ( t -= 1 )) * Math.sin(( t - s ) * ( 2 * Math.PI ) / p ));
}
export const outElastic = (t) => {
    let s, a = 0.1, p = 0.4;
    if ( t === 0 ) return 0;
    if ( t === 1 ) return 1;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
    return (a * Math.pow( 2, - 10 * t) * Math.sin(( t - s ) * ( 2 * Math.PI ) / p ) + 1 );
}
export const inOutElastic = (t) => {
    let s, a = 0.1, p = 0.4;
    if ( t === 0 ) return 0;
    if ( t === 1 ) return 1;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
    if ( ( t *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( t -= 1 ) ) * Math.sin(( t - s ) * ( 2 * Math.PI ) / p ) );
    return a * Math.pow( 2, -10 * ( t -= 1 ) ) * Math.sin(( t - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
}