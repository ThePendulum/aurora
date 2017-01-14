# aurora
aurora is an addressable LED controller for the Raspberry Pi. It provides an easy to use web interface backed by a power mathematical expression parser.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Configuration](#configuration)
- [Color channels](#color-channels)
  - [Master](#master)
  - [RGB](#rgb)
  - [HSV](#hsv)
- [Mathematical expressions](#mathematical-expressions)
  - [Presets](#presets)
- [Variables](#variables)
  - [Dimensions and positions](#dimensions-and-positions)
  - [Animation seeds](#animation-seeds)
  - [Modulation pad](#modulation-pad)
  - [Time](#time)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
aurora relies on Node.js, which is best installed through [nvm](https://github.com/creationix/nvm). Node.js comes with a package manager npm, which is used to install aurora's dependencies:

```
npm install
```

After initial installation, the database (for users and presets) will need to be set up. Optionally, the database can be filled with default presets for common effects. This is also done through npm:

```
npm run database-setup
npm run database-fill
```

aurora needs to be built once after installation, and after every reconfiguration. Please check out the configuration section before building:

```
npm run build
```

Finally, to run aurora:

```
npm start
```

## Configuration
An example configuration file can be found at `config/example.js`. This file is only an example indeed and will be ignored and overwritten when aurora is updated. To configure aurora, copy this file to `config/default.js` and open it in your favorite text editor.

## Color channels
The color channels on the web interface are the primary way of setting what your LEDs will display. There are seven channels: Master, RGB (Red, Green Blue) and HSV (Hue, Saturation, Value). When a channel from either the RGB or HSV channel group gets updated, the other channel group will be ignored. The Master channel is linked to the RGB channel group in this behavior.

### Master
The master channel takes a hexadecimal color value and, when available, will show the web browser's native color input.

### RGB
The RGB channels represent red, green and blue respectively. Each channel ranges between 0 and 255 and exceeding values will be capped. By combining all three channels, over 16 million colors can be created.

### HSV
The HSV channels represent hue, saturation and value, a [cylindrical representation](http://i.imgur.com/iYzgRRI.png) of the RGB color model. The hue channel represents a value between 0 and 360 (degrees) on a [color wheel](http://i.imgur.com/5UpyIGh.png). Values exceeding 360 will wrap around from 0 (380 will be equal to 20, 12490 to 250, and so on). The saturation and value channels accept a value between 0 and 1, and represent the colorfulness and brightness respectively. Values exceeding 1 will be capped. The HSV channels are most suitable for e.g. color cycling, brightness fading and pulsing, as a single HSV channel can affect all colors of the RGB color model at once.

## Mathematical expressions
A static color can look cozy, but to make things more exciting, each color channel is powered by a mathematical expression parser that provides access to [lots of mathematical operations](https://github.com/silentmatt/expr-eval#expression-syntax), which become especially powerful in combination with the variables aurora makes available.

### Presets
Of course, composing expressions is not everyone's favorite pastime. Therefore, expressions for common effects are provided as presets, and are listed below a channel on focus. The master channel lists presets that affect multiple other channels. When applying a preset, its expression will be visible, demonstrating how variables can be used to create various effects.

## Variables
The following variables may be used in expressions on all color channels:

### Dimensions and coordinates
* `length` or `l`: The total number of LEDs.
* `index` or `i`: The sequential position of a LED.
* `width` or `w`: The width of the matrix. Equivalent to `length` on a strip.
* `height` or `h`: The height of the matrix. Always 1 on a strip.
* `x` and `y`: The x- and y-coordinate of an LED in a matrix. On a strip, they are equivalent to `i` and 0 respectively.

### Animation seeds
* `beat` or `b`: An incremental value that ticks every update cycle.
* `randomPixel` or `rp`: A random value between 0 and 1 unique for every LED for every update cycle.

### Modulation pad
* `mx` and `my`: The x- and y-position of the pointer on the modulation pad, mapped to values between 0 and 1.

### Time
* `time` or `t`: Numbers of milliseconds since January 1, 1970 00:00:00 GMT (Unix epoch).
* `year` or `yr`: The current year in four digits.
* `month` or `mo`: The current month between 1 and 12.
* `date` or `d`: The current date or day of the month.
* `day`: The current day of the week between 1 and 7.
* `hour` or `hr`: The current hour of the day between 0 and 23.
* `minute` or `m`: The current minute of the hour.
* `second` or `s`: The current second of the minute.
* `millisecond` or `ms`: The current millisecond of the second.

### Previous
* `previousHue` or `ph`: Previous hue value.
* `previousSaturation` or `ps`: Previous saturation value.
* `previousValue` or `pv`: Previous value value.
* `previousRed` or `pr`: Previous red value.
* `previousGreen` or `pg`: Previous green value.
* `previousBlue` or `pb`: Previous blue value.
