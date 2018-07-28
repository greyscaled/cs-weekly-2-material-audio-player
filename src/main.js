/**
 * Example Useage of AudioPlayer.
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

const AudioPlayer = require('./audio-player')
const ToggleButton = require('./toggle-button')

function main () {
  // module constants
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const dF = 0.0 // inital delta frequency
  const volume = 0.5 // initial Volume -> (0.0, 1.0)
  const player = new AudioPlayer({ ctx, volume })
  const f1visualData = new Uint8Array(player.getAnalyzerFFTSize(1))
  const f2visualData = new Uint8Array(player.getAnalyzerFFTSize(2))
  const f3visualData = new Uint8Array(player.getAnalyzerFFTSize(3))
  const playBtnStates = new ToggleButton({
    on: 'pause',
    off: 'play'
  })
  // DOM Els
  const playBtnEl = document.getElementById('playButton')
  const playEl = document.querySelector('.svg-audio-btn__play')
  const pauseEl = document.querySelector('.svg-audio-btn__pauseGrp')
  const visualizer = document.getElementById('visualizer')
  const vCtx = visualizer.getContext('2d')
  const waveCtrl1El = document.getElementById('wave1Control')
  const waveCtrl2El = document.getElementById('wave2Control')
  const waveCtrl3El = document.getElementById('wave3Control')
  const volumeControl = document.getElementById('volumeControl')

  // initial position of each input
  waveCtrl1El.value = dF
  waveCtrl2El.value = dF
  waveCtrl3El.value = dF
  volumeControl.value = volume

  // unlock on mobile - code written by Pavle Goloskokovic
  // https://hackernoon.com/unlocking-web-audio-the-smarter-way-8858218c0e09
  if (ctx.state === 'suspended' && 'ontouchstart' in window) {
    const unlock = _ => {
      ctx
        .resume()
        .then(_ => {
          document.body.removeEventListener('touchstart', unlock)
          document.body.removeEventListener('touchend', unlock)
        })
    }

    document.body.addEventListener('touchstart', unlock, false)
    document.body.addEventListener('touchend', unlock, false)
  }

  // Play Button click handler
  playBtnEl.addEventListener('click', function () {
    if (playBtnStates.toggle() === 'pause') { // play was pressed
      // reset each frequency
      waveCtrl1El.value = dF
      waveCtrl2El.value = dF
      waveCtrl3El.value = dF
      volumeControl.value = volume // reset vol knob
      playEl.classList.add('hidden')
      pauseEl.classList.remove('hidden')
    } else { // pause was pressed
      // reset each frequency
      waveCtrl1El.value = dF
      waveCtrl2El.value = dF
      waveCtrl3El.value = dF
      volumeControl.value = volume // reset vol knob
      playEl.classList.remove('hidden')
      pauseEl.classList.add('hidden')
    }

    player.togglePlay()
  })

  // wave input handlers - make sure to map attribute
  // vals to Numbers, as that's what AudioPlayer expects
  ;[
    waveCtrl1El,
    waveCtrl2El,
    waveCtrl3El
  ].forEach(ctrl => {
    ctrl.addEventListener('input', function (e) {
      if (playBtnStates.current === 'on') {
        player.changeFrequency(
          Number(this.dataset.f), // attr data-f -> (1, 3)
          Number(this.value)
        )
      }
    })
  })

  // Volume input handler
  volumeControl.addEventListener('input', function (e) {
    if (playBtnStates.current === 'on') {
      player.changeGain(Number(this.value))
    }
  })

  // visualizer animation largely based off of MDN example:
  // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js
  function draw () {
    let WIDTH = visualizer.width
    let HEIGHT = visualizer.height

    // loop this
    window.requestAnimationFrame(draw)

    // get the current Data (gets placed into array arg)
    player.getAnalyzerTimeBytes(1, f1visualData)
    player.getAnalyzerTimeBytes(2, f2visualData)
    player.getAnalyzerTimeBytes(3, f3visualData)

    // set the canvas style
    vCtx.fillStyle = '#EEE'
    vCtx.fillRect(0, 0, WIDTH, HEIGHT)
    vCtx.lineWidth = 2

    // now that we have the current Data for each wave, loop
    // through each and draw each point value
    drawWave(player.getAnalyzerFFTSize(1), '#26a69a', f1visualData)
    drawWave(player.getAnalyzerFFTSize(2), '#ec407a', f2visualData)
    drawWave(player.getAnalyzerFFTSize(3), '#29b6f6', f3visualData)

    function drawWave (bufferLength, color, dataArray) {
      // draw the path - loop through
      // the Uint8Array and draw each pt
      vCtx.beginPath()
      vCtx.strokeStyle = color

      // space between each point
      let sliceWidth = WIDTH * 0.75 / bufferLength

      // x position to draw current pt
      // incremented by sliceWidth
      let x = 0

      dataArray.forEach(soundVal => {
        // v -> (0, 255) / 128.0 -> (0.0, 2.0]
        let v = dataArray[soundVal] / 128.0
        let y = v * HEIGHT / 2

        // on first value, go to beginning
        soundVal === 0
          ? vCtx.moveTo(x, y)
          : vCtx.lineTo(x, y)

        x += sliceWidth
      })

      vCtx.lineTo(WIDTH, HEIGHT / 2)
      vCtx.stroke()
    }
  }

  draw()
}

main()
