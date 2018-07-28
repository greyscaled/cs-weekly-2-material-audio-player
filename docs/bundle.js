/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/audio-player.js":
/*!*****************************!*\
  !*** ./src/audio-player.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * Class representing an audio player with volume\r\n * control. A constant cord is emitted.\r\n *\r\n * Heavily based off of the MDN documentation examples.\r\n * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Controlling_multiple_parameters_with_ConstantSourceNode\r\n *\r\n * Demo/Example from MDN docs\r\n * @see {@link https://github.com/mdn/voice-change-o-matic/|voice-change-o-matic}\r\n *\r\n * Check out my {@link https://medium.com/@vapurrmaid|blog} and\r\n * {@link https://github.com/vapurrmaid|github} for more\r\n *\r\n * @author Vapurrmaid <vapurrmaid@gmail.com>\r\n * @file AudioPlayer class\r\n * @copyright Vapurrmaid/Grey B 2018\r\n * @license MIT\r\n */\nvar AudioPlayer = function () {\n  /**\r\n   * @param {Object} opts - (required)\r\n   * @param {Object} opts.ctx - (required) The AudioContext Object\r\n   * @param {number} [opts.volume=0.5] - the overall volume\r\n   * @param {number} [opts.f1=130.81] - the frequency of wave 1\r\n   * @param {number} [opts.f2=164.81] - the frequency of wave 2\r\n   * @param {number} [opts.f3=196.00] - the frequency of wave 3\r\n   * @returns {Object.<AudioPlayer>}\r\n   */\n  function AudioPlayer(opts) {\n    _classCallCheck(this, AudioPlayer);\n\n    // AudioContext\n    this.ctx = opts.ctx;\n\n    // Effects Nodes\n    this.gainNode1 = this.ctx.createGain();\n    this.gainNode2 = this.ctx.createGain();\n    this.gainNode3 = this.ctx.createGain();\n    this.f1Analyzer = this.ctx.createAnalyser({\n      fftSize: 256\n    });\n    this.f2Analyzer = this.ctx.createAnalyser({\n      fftSize: 256\n    });\n    this.f3Analyzer = this.ctx.createAnalyser({\n      fftSize: 256\n    });\n\n    // member Variables\n    this.mF1 = opts.f1 || 130.81;\n    this.mF2 = opts.f2 || 164.81;\n    this.mF3 = opts.f3 || 196.00;\n    this.mPlaying = false;\n    this.mVolume = opts.volume || 0.5;\n    this.mVolume = 0.33 * this.mVolume; // adjust for 3 gains\n\n    // set the Gain\n    this.gainNode1.gain.value = this.mVolume;\n    this.gainNode2.gain.value = this.mVolume;\n    this.gainNode3.gain.value = this.mVolume;\n\n    // Connect the Graph of Nodes in the Ctx\n    this.gainNode1.connect(this.ctx.destination);\n    this.gainNode2.connect(this.ctx.destination);\n    this.gainNode3.connect(this.ctx.destination);\n\n    // allow chaining\n    return this;\n  }\n\n  // PRIVATE Helper Methods\n\n  /**\r\n   * Creates and starts Oscillators. Must be re-created each\r\n   * time as they do not have a 'paused' state\r\n   * @private\r\n   * @returns {undefined}\r\n   */\n\n\n  _createClass(AudioPlayer, [{\n    key: '_startOscillators',\n    value: function _startOscillators() {\n      console.log('starting oscillators');\n      this.oscNode1 = this.ctx.createOscillator();\n      this.oscNode1.type = 'sine';\n      this.oscNode1.frequency.value = this.mF1;\n      this.oscNode1.connect(this.gainNode1);\n      this.oscNode1.connect(this.f1Analyzer);\n\n      this.oscNode2 = this.ctx.createOscillator();\n      this.oscNode2.type = 'sine';\n      this.oscNode2.frequency.value = this.mF2;\n      this.oscNode2.connect(this.gainNode2);\n      this.oscNode2.connect(this.f2Analyzer);\n\n      this.oscNode3 = this.ctx.createOscillator();\n      this.oscNode3.type = 'sine';\n      this.oscNode3.frequency.value = this.mF3;\n      this.oscNode3.connect(this.gainNode3);\n      this.oscNode3.connect(this.f3Analyzer);\n\n      this.oscNode1.start();\n      this.oscNode2.start();\n      this.oscNode3.start();\n\n      this.mPlaying = true;\n    }\n\n    /**\r\n     * Stops Oscillators\r\n     * @private\r\n     * @returns {undefined}\r\n     */\n\n  }, {\n    key: '_stopOscillators',\n    value: function _stopOscillators() {\n      console.log('stopping oscillators');\n      this.oscNode1.stop();\n      this.oscNode2.stop();\n      this.oscNode3.stop();\n      this.mPlaying = false;\n    }\n\n    // Public Methods\n\n    /**\r\n     * Adjusts the overall volume\r\n     * @param {number} volume - between (0.0, 1.0)\r\n     * @returns {undefined}\r\n     */\n\n  }, {\n    key: 'changeGain',\n    value: function changeGain(volume) {\n      this.mVolume = 0.33 * volume;\n      this.gainNode1.gain.value = this.mVolume;\n      this.gainNode2.gain.value = this.mVolume;\n      this.gainNode3.gain.value = this.mVolume;\n    }\n\n    /**\r\n     * Adjusts the value of a frequency.\r\n     * @param {number} f - (1, 3). The frequency to change.\r\n     * @param {number} df - the amount to change the frequency\r\n     * @returns {undefined}\r\n     */\n\n  }, {\n    key: 'changeFrequency',\n    value: function changeFrequency(f, dF) {\n      switch (f) {\n        case 1:\n          this.oscNode1.frequency.value = this.mF1 + dF;\n          break;\n        case 2:\n          this.oscNode2.frequency.value = this.mF2 + dF;\n          break;\n        case 3:\n          this.oscNode3.frequency.value = this.mF3 + dF;\n          break;\n        default:\n          break;\n      }\n    }\n\n    /**\r\n     * Returns 1/2 the FFT value for a given source. Represents the number of\r\n     * data values for visualization in the frequency domain.\r\n     * Use to assign the length of an unsigned 8-bit array (ie: Uint8Array [binCount])\r\n     * @param {number} f - The frequency (1, 3) to obtain the bin count\r\n     * @returns {number}\r\n     */\n\n  }, {\n    key: 'getAnalyzerBinCount',\n    value: function getAnalyzerBinCount(f) {\n      switch (f) {\n        case 1:\n          return this.f1Analyzer.frequencyBinCount;\n        case 2:\n          return this.f2Analyzer.frequencyBinCount;\n        case 3:\n          return this.f3Analyzer.frequencyBinCount;\n        default:\n          return 0;\n      }\n    }\n\n    /**\r\n     * Returns the fftSize which is an unsigned long value\r\n     * and represents the window size in samples that is used\r\n     * when performing a Fast Fourier Transform.\r\n     * @param {number} f - The frequency (1, 3) for which to get\r\n     * the FFT size.\r\n     * returns {number} - an unsigned long\r\n     */\n\n  }, {\n    key: 'getAnalyzerFFTSize',\n    value: function getAnalyzerFFTSize(f) {\n      switch (f) {\n        case 1:\n          return this.f1Analyzer.fftSize;\n        case 2:\n          return this.f2Analyzer.fftSize;\n        case 3:\n          return this.f3Analyzer.fftSize;\n        default:\n          return 0;\n      }\n    }\n\n    /**\r\n     * Copies the current time domain data into the\r\n     * provided array. Must be of type Uint8Array.\r\n     * @param {number} f - The frequency (1, 3) to get the time btyes\r\n     * @param {Uint8Array} dataArray\r\n     * @returns {undefined}\r\n     */\n\n  }, {\n    key: 'getAnalyzerTimeBytes',\n    value: function getAnalyzerTimeBytes(f, dataArray) {\n      switch (f) {\n        case 1:\n          this.f1Analyzer.getByteTimeDomainData(dataArray);\n          break;\n        case 2:\n          this.f2Analyzer.getByteTimeDomainData(dataArray);\n          break;\n        case 3:\n          this.f3Analyzer.getByteTimeDomainData(dataArray);\n          break;\n        default:\n          break;\n      }\n    }\n\n    /**\r\n     * Starts or stops the audio player.\r\n     * @returns {undefined}\r\n     */\n\n  }, {\n    key: 'togglePlay',\n    value: function togglePlay() {\n      this.mPlaying ? this._stopOscillators() : this._startOscillators();\n    }\n  }]);\n\n  return AudioPlayer;\n}();\n\nmodule.exports = AudioPlayer;\n\n//# sourceURL=webpack:///./src/audio-player.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\r\n * Example Useage of AudioPlayer.\r\n *\r\n * Heavily based off of the MDN documentation examples.\r\n * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Controlling_multiple_parameters_with_ConstantSourceNode\r\n *\r\n * Demo/Example from MDN docs\r\n * @see {@link https://github.com/mdn/voice-change-o-matic/|voice-change-o-matic}\r\n *\r\n * Check out my {@link https://medium.com/@vapurrmaid|blog} and\r\n * {@link https://github.com/vapurrmaid|github} for more\r\n *\r\n * @author Vapurrmaid <vapurrmaid@gmail.com>\r\n * @file AudioPlayer class\r\n * @copyright Vapurrmaid/Grey B 2018\r\n * @license MIT\r\n */\n\nvar AudioPlayer = __webpack_require__(/*! ./audio-player */ \"./src/audio-player.js\");\nvar ToggleButton = __webpack_require__(/*! ./toggle-button */ \"./src/toggle-button.js\");\n\nfunction main() {\n  // module constants\n  var ctx = new (window.AudioContext || window.webkitAudioContext)();\n  var dF = 0.0; // inital delta frequency\n  var volume = 0.5; // initial Volume -> (0.0, 1.0)\n  var player = new AudioPlayer({ ctx: ctx, volume: volume });\n  var f1visualData = new Uint8Array(player.getAnalyzerFFTSize(1));\n  var f2visualData = new Uint8Array(player.getAnalyzerFFTSize(2));\n  var f3visualData = new Uint8Array(player.getAnalyzerFFTSize(3));\n  var playBtnStates = new ToggleButton({\n    on: 'pause',\n    off: 'play'\n  });\n  // DOM Els\n  var playBtnEl = document.getElementById('playButton');\n  var playEl = document.querySelector('.svg-audio-btn__play');\n  var pauseEl = document.querySelector('.svg-audio-btn__pauseGrp');\n  var visualizer = document.getElementById('visualizer');\n  var vCtx = visualizer.getContext('2d');\n  var waveCtrl1El = document.getElementById('wave1Control');\n  var waveCtrl2El = document.getElementById('wave2Control');\n  var waveCtrl3El = document.getElementById('wave3Control');\n  var volumeControl = document.getElementById('volumeControl');\n\n  // initial position of each input\n  waveCtrl1El.value = dF;\n  waveCtrl2El.value = dF;\n  waveCtrl3El.value = dF;\n  volumeControl.value = volume;\n\n  // unlock on mobile - code written by Pavle Goloskokovic\n  // https://hackernoon.com/unlocking-web-audio-the-smarter-way-8858218c0e09\n  if (ctx.state === 'suspended' && 'ontouchstart' in window) {\n    var unlock = function unlock(_) {\n      ctx.resume().then(function (_) {\n        document.body.removeEventListener('touchstart', unlock);\n        document.body.removeEventListener('touchend', unlock);\n      });\n    };\n\n    document.body.addEventListener('touchstart', unlock, false);\n    document.body.addEventListener('touchend', unlock, false);\n  }\n\n  // Play Button click handler\n  playBtnEl.addEventListener('click', function () {\n    if (playBtnStates.toggle() === 'pause') {\n      // play was pressed\n      // reset each frequency\n      waveCtrl1El.value = dF;\n      waveCtrl2El.value = dF;\n      waveCtrl3El.value = dF;\n      volumeControl.value = volume; // reset vol knob\n      playEl.classList.add('hidden');\n      pauseEl.classList.remove('hidden');\n    } else {\n      // pause was pressed\n      // reset each frequency\n      waveCtrl1El.value = dF;\n      waveCtrl2El.value = dF;\n      waveCtrl3El.value = dF;\n      volumeControl.value = volume; // reset vol knob\n      playEl.classList.remove('hidden');\n      pauseEl.classList.add('hidden');\n    }\n\n    player.togglePlay();\n  })\n\n  // wave input handlers - make sure to map attribute\n  // vals to Numbers, as that's what AudioPlayer expects\n  ;[waveCtrl1El, waveCtrl2El, waveCtrl3El].forEach(function (ctrl) {\n    ctrl.addEventListener('input', function (e) {\n      if (playBtnStates.current === 'on') {\n        player.changeFrequency(Number(this.dataset.f), // attr data-f -> (1, 3)\n        Number(this.value));\n      }\n    });\n  });\n\n  // Volume input handler\n  volumeControl.addEventListener('input', function (e) {\n    if (playBtnStates.current === 'on') {\n      player.changeGain(Number(this.value));\n    }\n  });\n\n  // visualizer animation largely based off of MDN example:\n  // https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js\n  function draw() {\n    var WIDTH = visualizer.width;\n    var HEIGHT = visualizer.height;\n\n    // loop this\n    window.requestAnimationFrame(draw);\n\n    // get the current Data (gets placed into array arg)\n    player.getAnalyzerTimeBytes(1, f1visualData);\n    player.getAnalyzerTimeBytes(2, f2visualData);\n    player.getAnalyzerTimeBytes(3, f3visualData);\n\n    // set the canvas style\n    vCtx.fillStyle = '#EEE';\n    vCtx.fillRect(0, 0, WIDTH, HEIGHT);\n    vCtx.lineWidth = 2;\n\n    // now that we have the current Data for each wave, loop\n    // through each and draw each point value\n    drawWave(player.getAnalyzerFFTSize(1), '#26a69a', f1visualData);\n    drawWave(player.getAnalyzerFFTSize(2), '#ec407a', f2visualData);\n    drawWave(player.getAnalyzerFFTSize(3), '#29b6f6', f3visualData);\n\n    function drawWave(bufferLength, color, dataArray) {\n      // draw the path - loop through\n      // the Uint8Array and draw each pt\n      vCtx.beginPath();\n      vCtx.strokeStyle = color;\n\n      // space between each point\n      var sliceWidth = WIDTH * 0.75 / bufferLength;\n\n      // x position to draw current pt\n      // incremented by sliceWidth\n      var x = 0;\n\n      dataArray.forEach(function (soundVal) {\n        // v -> (0, 255) / 128.0 -> (0.0, 2.0]\n        var v = dataArray[soundVal] / 128.0;\n        var y = v * HEIGHT / 2;\n\n        // on first value, go to beginning\n        soundVal === 0 ? vCtx.moveTo(x, y) : vCtx.lineTo(x, y);\n\n        x += sliceWidth;\n      });\n\n      vCtx.lineTo(WIDTH, HEIGHT / 2);\n      vCtx.stroke();\n    }\n  }\n\n  draw();\n}\n\nmain();\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "./src/toggle-button.js":
/*!******************************!*\
  !*** ./src/toggle-button.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * State manager for a button with two states.\r\n *\r\n * Check out my {@link https://medium.com/@vapurrmaid|blog} and\r\n * {@link https://github.com/vapurrmaid|github} for more.\r\n *\r\n * @author Vapurrmaid <vapurrmaid@gmail.com>\r\n * @file AudioPlayer class\r\n * @copyright Vapurrmaid/Grey B 2018\r\n * @license MIT\r\n */\nvar ToggleButton = function () {\n  /**\r\n   * @param {Object} [options={}]\r\n   * @param {string} [options.on=\"⏸\"] - state to show when 'on'\r\n   * @param {string} [options.off=\"▶️\"] - state to shown when 'off'\r\n   * @param {boolean} [options.startOn=false] - if true, starts in\r\n      'on' state. Else starts in 'off' state\r\n   * @returns {undefined}\r\n   */\n  function ToggleButton() {\n    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};\n\n    _classCallCheck(this, ToggleButton);\n\n    this.on = options.on || '⏸';\n    this.off = options.off || '▶️';\n    options.startOn ? this.current = 'on' : this.current = 'off';\n  }\n\n  /**\r\n   * Toggles the state and returns the matching string\r\n   * representation of the new state.\r\n   * @returns {string}\r\n   */\n\n\n  _createClass(ToggleButton, [{\n    key: 'toggle',\n    value: function toggle() {\n      this.current === 'on' ? this.current = 'off' : this.current = 'on';\n      return this[this.current];\n    }\n  }]);\n\n  return ToggleButton;\n}();\n\nmodule.exports = ToggleButton;\n\n//# sourceURL=webpack:///./src/toggle-button.js?");

/***/ })

/******/ });