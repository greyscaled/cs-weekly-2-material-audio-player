[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![Greenkeeper badge](https://badges.greenkeeper.io/vapurrmaid/cs-weekly-2-material-audio-player.svg)](https://greenkeeper.io/)
# cs-weekly-2-material-audio-player
Implements Web Audio API to create a simple wave oscillator visualizer. Original designed classes and architecture heavily inspired by examples on MDN.
See [MDN example](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Controlling_multiple_parameters_with_ConstantSourceNode)

## Writeup

I wrote a blog article discussing the Web Audio API and explaining
the program [here](https://medium.com/@vapurrmaid/c-s-weekly-2-material-wave-visualizer-and-the-web-audio-api-5a16c2af4d3b).

This project is an iteration of an effort called Code Something Weekly. The
article explaining how and why is found [here](https://medium.com/@vapurrmaid/code-something-weekly-how-and-why-44640d279ca1)

## Demo

[LIVE DEMO](https://vapurrmaid.github.io/cs-weekly-2-material-audio-player/)


![screenshot of demo](https://raw.githubusercontent.com/vapurrmaid/cs-weekly-2-material-audio-player/master/assets/demo.PNG)


<a name="AudioPlayer"></a>

## AudioPlayer
**Kind**: global class  

* [AudioPlayer](#AudioPlayer)
    * [new AudioPlayer(opts)](#new_AudioPlayer_new)
    * [.changeGain(volume)](#AudioPlayer+changeGain) ⇒ <code>undefined</code>
    * [.changeFrequency(f, df)](#AudioPlayer+changeFrequency) ⇒ <code>undefined</code>
    * [.getAnalyzerBinCount(f)](#AudioPlayer+getAnalyzerBinCount) ⇒ <code>number</code>
    * [.getAnalyzerFFTSize(f)](#AudioPlayer+getAnalyzerFFTSize) ⇒ <code>number</code>
    * [.getAnalyzerTimeBytes(f, dataArray)](#AudioPlayer+getAnalyzerTimeBytes) ⇒ <code>undefined</code>
    * [.togglePlay()](#AudioPlayer+togglePlay) ⇒ <code>undefined</code>

<a name="new_AudioPlayer_new"></a>

### new AudioPlayer(opts)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| opts | <code>Object</code> |  | (required) |
| opts.ctx | <code>Object</code> |  | (required) The AudioContext Object |
| [opts.volume] | <code>number</code> | <code>0.5</code> | the overall volume |
| [opts.f1] | <code>number</code> | <code>130.81</code> | the frequency of wave 1 |
| [opts.f2] | <code>number</code> | <code>164.81</code> | the frequency of wave 2 |
| [opts.f3] | <code>number</code> | <code>196.00</code> | the frequency of wave 3 |

<a name="AudioPlayer+changeGain"></a>

### audioPlayer.changeGain(volume) ⇒ <code>undefined</code>
Adjusts the overall volume

**Kind**: instance method of [<code>AudioPlayer</code>](#AudioPlayer)  

| Param | Type | Description |
| --- | --- | --- |
| volume | <code>number</code> | between (0.0, 1.0) |

<a name="AudioPlayer+changeFrequency"></a>

### audioPlayer.changeFrequency(f, df) ⇒ <code>undefined</code>
Adjusts the value of a frequency.

**Kind**: instance method of [<code>AudioPlayer</code>](#AudioPlayer)  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>number</code> | (1, 3). The frequency to change. |
| df | <code>number</code> | the amount to change the frequency |

<a name="AudioPlayer+getAnalyzerBinCount"></a>

### audioPlayer.getAnalyzerBinCount(f) ⇒ <code>number</code>
Returns 1/2 the FFT value for a given source. Represents the number ofdata values for visualization in the frequency domain.Use to assign the length of an unsigned 8-bit array (ie: Uint8Array [binCount])

**Kind**: instance method of [<code>AudioPlayer</code>](#AudioPlayer)  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>number</code> | The frequency (1, 3) to obtain the bin count |

<a name="AudioPlayer+getAnalyzerFFTSize"></a>

### audioPlayer.getAnalyzerFFTSize(f) ⇒ <code>number</code>
Returns the fftSize which is an unsigned long valueand represents the window size in samples that is usedwhen performing a Fast Fourier Transform.

**Kind**: instance method of [<code>AudioPlayer</code>](#AudioPlayer)  
**Returns**: <code>number</code> - - an unsigned long  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>number</code> | The frequency (1, 3) for which to get the FFT size. |

<a name="AudioPlayer+getAnalyzerTimeBytes"></a>

### audioPlayer.getAnalyzerTimeBytes(f, dataArray) ⇒ <code>undefined</code>
Copies the current time domain data into theprovided array. Must be of type Uint8Array.

**Kind**: instance method of [<code>AudioPlayer</code>](#AudioPlayer)  

| Param | Type | Description |
| --- | --- | --- |
| f | <code>number</code> | The frequency (1, 3) to get the time btyes |
| dataArray | <code>Uint8Array</code> |  |

<a name="AudioPlayer+togglePlay"></a>

### audioPlayer.togglePlay() ⇒ <code>undefined</code>
Starts or stops the audio player.

**Kind**: instance method of [<code>AudioPlayer</code>](#AudioPlayer)  

&copy; 2018 Vapurrmaid
