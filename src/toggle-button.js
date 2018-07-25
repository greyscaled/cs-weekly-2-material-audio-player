/**
 * State manager for a button with two states.
 *
 * Check out my {@link https://medium.com/@vapurrmaid|blog} and
 * {@link https://github.com/vapurrmaid|github} for more.
 *
 * @author Vapurrmaid <vapurrmaid@gmail.com>
 * @file AudioPlayer class
 * @copyright Vapurrmaid/Grey B 2018
 * @license MIT
 */
class ToggleButton {
  /**
   * @param {Object} [options={}]
   * @param {string} [options.on="⏸"] - state to show when 'on'
   * @param {string} [options.off="▶️"] - state to shown when 'off'
   * @param {boolean} [options.startOn=false] - if true, starts in
      'on' state. Else starts in 'off' state
   * @returns {undefined}
   */
  constructor (options = {}) {
    this.on = options.on || '⏸'
    this.off = options.off || '▶️'
    options.startOn
      ? this.current = 'on'
      : this.current = 'off'
  }

  /**
   * Toggles the state and returns the matching string
   * representation of the new state.
   * @returns {string}
   */
  toggle () {
    this.current === 'on'
      ? this.current = 'off'
      : this.current = 'on'
    return this[this.current]
  }
}

module.exports = ToggleButton
