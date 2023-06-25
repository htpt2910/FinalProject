export default function CalculatePriceBaseOnWeight(weight: number) {
  var cutting = 0
  var shower = 0
  var cleaning = 0
  if (weight < 3) {
    cutting = 200
    shower = 100
    cleaning = 150
  }
  if (weight >= 3 && weight < 5) {
    cutting = 350
    shower = 150
    cleaning = 180
  }
  if (weight >= 5 && weight < 10) {
    cutting = 400
    shower = 250
    cleaning = 250
  }
  if (weight > 10) {
    return "Discuss with consultant to get the best price!"
  }
  return cutting + shower + cleaning
}
