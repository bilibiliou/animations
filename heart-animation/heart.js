// 输入极坐标的度数，根据心形函数输出心形坐标
// 心形函数
// ρ = 11
// x = ρ * 16 * Sin³(θ)
// y = ρ * (13 * Cos(θ) - 5Cos(2θ) - 2Cos(2θ) - 2Cos(3θ) - Cos(4θ))
function calcHeartPosition(θ) {
  const { cos, sin, pow } = Math;
  const p = 11;
  return {
    x: p * 16 * pow(sin(θ), 3),
    y: p * (13 * cos(θ) - 5 * cos(2 * θ) - 2 * cos(3 * θ) - cos(4 * θ))
  }
}
