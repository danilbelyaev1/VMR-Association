export default class YMapPoint {
  /**
   * @param {number|string} latitude
   * @param {number|string} longitude
   * @param {Function} [clickCallback]
   * @param {Object} [options]
   * @param {Object} [style]
   */
  constructor({
    latitude,
    longitude,
    clickCallback,
    options = {},
    style = {},
  }) {
    this.latitude = latitude
    this.longitude = longitude
    this.clickCallback = clickCallback
    this.options = options
    this.style = style
  }

  /**
   * @returns {(number|string)[]}
   */
  get coordinate() {
    return [this.latitude, this.longitude]
  }
}
