/**
 * Class representing an audio player with volume
 * control. A constant cord is emitted.
 *
 * Heavily based off of the MDN documentation examples.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Controlling_multiple_parameters_with_ConstantSourceNode
 *
 * Demo/Example from MDN docs
 * @see {@link https://github.com/mdn/voice-change-o-matic/|voice-change-o-matic}
 *
 * Check out my {@link https://medium.com/@vapurrmaid|blog} and
 * {@link https://github.com/vapurrmaid|github} for more
 *
 * @author Vapurrmaid <vapurrmaid@gmail.com>
 * @file AudioPlayer class
 * @copyright Vapurrmaid/Grey B 2018
 * @license MIT
 */
class AudioPlayer {
  /**
   * @param {Object} opts - (required)
   * @param {Object} opts.ctx - (required) The AudioContext Object
   * @param {number} [opts.volume=0.5] - the overall volume
   * @param {number} [opts.f1=65.41] - the frequency of wave 1
   * @param {number} [opts.f2=82.41] - the frequency of wave 2
   * @param {number} [opts.f3=98.0] - the frequency of wave 3
   * @returns {Object.<AudioPlayer>}
   */
  constructor (opts) {
    // AudioContext
    this.ctx = opts.ctx

    // Effects Nodes
    this.gainNode = this.ctx.createGain()
    this.f1Analyzer = this.ctx.createAnalyser()
    this.f2Analyzer = this.ctx.createAnalyser()
    this.f3Analyzer = this.ctx.createAnalyser()

    // member Variables
    this.mF1 = opts.f1 || 65.41
    this.mF2 = opts.f2 || 82.41
    this.mF3 = opts.f3 || 98.0
    this.mPlaying = false
    this.mVolume = opts.volume || 0.5

    // set the Gain
    this.gainNode.gain.value = this.mVolume

    // Connect the Graph of Nodes in the Ctx
    this.gainNode.connect(this.ctx.destination)

    // allow chaining
    return this
  }

  // PRIVATE Helper Methods

  /**
   * Creates and starts Oscillators. Must be re-created each
   * time as they do not have a 'paused' state
   * @private
   * @returns {undefined}
   */
  _startOscillators () {
    console.log('starting oscillators')
    this.oscNode1 = this.ctx.createOscillator()
    this.oscNode1.type = 'sine'
    this.oscNode1.frequency.value = this.mF1
    this.oscNode1.connect(this.gainNode)
    this.oscNode1.connect(this.f1Analyzer)

    this.oscNode2 = this.ctx.createOscillator()
    this.oscNode2.type = 'sine'
    this.oscNode2.frequency.value = this.mF2
    this.oscNode2.connect(this.gainNode)
    this.oscNode2.connect(this.f2Analyzer)

    this.oscNode3 = this.ctx.createOscillator()
    this.oscNode3.type = 'sine'
    this.oscNode3.frequency.value = this.mF3
    this.oscNode3.connect(this.gainNode)
    this.oscNode3.connect(this.f3Analyzer)

    this.oscNode1.start()
    this.oscNode2.start()
    this.oscNode3.start()

    this.mPlaying = true
  }

  /**
   * Stops Oscillators
   * @private
   * @returns {undefined}
   */
  _stopOscillators () {
    console.log('stopping oscillators')
    this.oscNode1.stop()
    this.oscNode2.stop()
    this.oscNode3.stop()
    this.mPlaying = false
  }

  // Public Methods

  /**
   * Adjusts the overall volume
   * @param {number} volume - between (0.0, 1.0)
   * @returns {undefined}
   */
  changeGain (volume) {
    this.mVolume = volume
    this.gainNode.gain.value = this.mVolume
  }

  /**
   * Adjusts the value of a frequency.
   * @param {number} f - (1, 3). The frequency to change.
   * @param {number} df - the amount to change the frequency
   * @returns {undefined}
   */
  changeFrequency (f, dF) {
    switch (f) {
      case 1:
        this.oscNode1.frequency.value = (this.mF1 + dF)
        break
      case 2:
        this.oscNode2.frequency.value = (this.mF2 + dF)
        break
      case 3:
        this.oscNode3.frequency.value = (this.mF3 + dF)
        break
      default: break
    }
  }

  /**
   * Returns 1/2 the FFT value for a given source. Represents the number of
   * data values for visualization. Use to assign the length of an unsigned
   * 8-bit array (ie: Uint8Array [binCount])
   * @param {number} f - The frequency (1, 3) to obtain the bin count
   * @returns {number}
   */
  getAnalyzerBinCount (f) {
    switch (f) {
      case 1: return this.f1Analyzer.frequencyBinCount
      case 2: return this.f2Analyzer.frequencyBinCount
      case 3: return this.f3Analyzer.frequencyBinCount
      default: return 0
    }
  }

  /**
   * Copies the current time domain data into the
   * provided array. Must be of type Uint8Array.
   * @param {number} f - The frequency (1, 3) to get the time btyes
   * @param {Uint8Array} dataArray
   * @returns {undefined}
   */
  getAnalyzerTimeBytes (f, dataArray) {
    switch (f) {
      case 1: this.f1Analyzer.getByteTimeDomainData(dataArray)
        break
      case 2: this.f2Analyzer.getByteTimeDomainData(dataArray)
        break
      case 3: this.f3Analyzer.getByteTimeDomainData(dataArray)
        break
      default: break
    }
  }

  /**
   * Starts or stops the audio player.
   * @returns {undefined}
   */
  togglePlay () {
    this.mPlaying
      ? this._stopOscillators()
      : this._startOscillators()
  }
}

module.exports = AudioPlayer
