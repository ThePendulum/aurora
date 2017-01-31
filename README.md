# aurora
aurora is an addressable LED controller for the Raspberry Pi. It provides an easy to use web interface backed by a powerful mathematical expression parser.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
  - [Running aurora](#running-aurora)
- [Configuration](#configuration)
  - [Meta](#meta)
  - [Rendering](#rendering)
  - [Authentication](#authentication)
  - [Users](#users)
  - [Default presets](#default-presets)
- [Color channels](#color-channels)
  - [Master](#master)
  - [RGB](#rgb)
  - [HSV](#hsv)
- [Mathematical expressions](#mathematical-expressions)
  - [Presets](#presets)
- [Variables](#variables)
  - [Dimensions and coordinates](#dimensions-and-coordinates)
  - [Animation seeds](#animation-seeds)
  - [Modulation pad](#modulation-pad)
  - [Time](#time)
  - [Previous](#previous)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
aurora relies on Node.js, which is best installed [as root](#running-aurora) through [nvm](https://github.com/creationix/nvm). Please make sure to log out as root before proceeding with the installation. Node.js comes with a package manager npm, which is used to install aurora's dependencies:

```
npm install
```

### Running aurora
Unfortunately, aurora requires to be run as root as to access the hardware interface to control the LEDs. Please walk through the [configuration](#configuration) section before running aurora for the first time. As root, aurora can be started through npm:

```
npm start
```

## Configuration
An example configuration file can be found at `config/example.js`. This file is only an example indeed and will be ignored and overwritten when aurora is updated. To configure aurora, copy this file to `config/default.js` and change it where necessary in your favorite text editor.

### Meta
* `chip`: This is the chip type your LED strip uses. Currently supported are `ws2801`, `ws2811`, `ws2812` and `ws2812b`.
* `size`: This is the length of a strip, or dimensions of a matrix. The length of a strip is defined as an integer (e.g. `300` for 300 pixels), and the dimensions of a matrix are defined as an array (e.g. `[16, 16]` for a 16 by 16 matrix).
* `colorIndex`: Not all chips expect color values in the order red, green, blue. The `colorIndex` determines the order in which values are sent to the chip. For example, `[0, 2, 1]` is red, blue, green, and `[1, 0, 2]` is green, red, blue.
* `zigzag`: Some, but not all, are wired in a snake or zigzag pattern. For example, in an 8 by 8 matrix, the 8th LED in series will be at the end of the first row, and the 9th LED in series will be at the end of the second row, going back. When `zigzag` is `false` or left undefined, it will be assumed all rows are in parallel, and the 9th LED in the example will be below the 1st LED at the start of the row. When `true`, a zigzag layout will be used.

### Rendering
* `fps` and `interval`: The `fps` or `interval` defines how frequently a new frame is rendered. The `fps` defines the number of frames per second, while the `interval` defines after how many milliseconds a new frame is rendered. A fps of 30 is equal to an interval of 1000 / 30 = ~33 milliseconds. Likewise, an interval of 20 milliseconds is equal to an fps of 1000 / 20 = 50 frames.
* `regulator`: The `regulator` allows the global brightness to be reduced. The values of each pixel will be multiplied with this value before being sent to the LEDs. For example, to (absolutely) half the brightness, the regulator would be `.5`.
* `render`: To use unsupported chips, custom render methods can be imported and defined in an object using the newly supported chip as the key. Typically, custom render methods are placed in `plugins/`. Please refer to [`src/modifiers/render`](src/modifiers/render) for insight on how render methods are composed. Configuration example:

    ```
    const apa102 = require('../plugins/apa102');

    module.exports = {
        chip: 'apa102',
        render: {
            apa102: apa102
        }
    };
    ```

### Authentication
* `requireAuth`: The aurora web interface can be made accessible on the Internet. This may call for a password to prevent unwanted access. When `requireAuth` is set to `true`, the web interface will prompt a login panel.
* `session.secret`: The session secret is used to provide secure authenticated access, and should be replaced with a long random token. The example token is public information, and may help unauthorized guests gaining access to your setup when authenticated is required.

### Users
For authentication, at least 1 user is required. A user is added as follows:

```
npm run user-add -- --username USERNAME --pasword PASSWORD --role ROLE
```

Accepted roles are `admin`, `guest` or `user` (default). Currently, there are no uses for roles, but in the future each may receive different privileges.

### Default presets
As you may wish to run aurora without any [presets](#presets), default presets are added manually:

```
npm run database-fill
```

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
* `random1` and `random2` or `r1` and `r2`: Random values between 0 and 1 unique for every update cycle.
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
