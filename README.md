# aurora ws28xx Remote for Raspberry Pi

## Installation
aurora relies on Node.js, which is best installed through [nvm](https://github.com/creationix/nvm). Node.js comes with a package manager npm, which is used to install aurora's dependencies:

`npm install`

To start aurora, run `app.js` through node:

`node app`

## Color channels
There are RGB and HSV color channels available. When one of the RGB channels gets modified, the HSV channels will be ignored. Likewise, when an HSV channel gets modified, the RGB channels will be ignored.


### RGB
The RGB channels represent red, green and blue respectively. Each channel accepts a value between 0 and 255. By combining all three channels, over 16 million colors can be created. All RGB channels are capped, meaning values above 255 will be truncated to 255.

### HSV
The HSV channels represent hue, saturation and value, a [cylindrical representation](http://i.imgur.com/iYzgRRI.png) of the RGB color model. The hue channel accepts a value between 0 and 360 (degrees) on a [color wheel](http://i.imgur.com/5UpyIGh.png). The saturation and value channels accept a value between 0 and 1, and represent the colorfulness and brightness respectively. The HSV channels are most suitable for e.g. color cycling and brightness fading and pulsing, as a single HSV channel can affect all colors of the RGB color model at once. The hue channel refers to a color wheel and values above 360 degrees will simply reset to 0 degrees, while the saturation and value channels are capped to 1.

### Synchronizations
When the an RGB or HSV channel is updated, the other channel group will synchronize when possible. This behavior can be disabled with the synchronization toggle.

### Mathematical expressions
A static color can look charming, but to spice things up, our LEDs should come to life! Each color channel is powered by a mathematical expression parser that allows access to [tons of mathematical operations](http://mathjs.org/docs/expressions/syntax.html), which become especially powerful in combination with the variables aurora makes available.

### Variables
The color channels RGB and HSV support expressions with the following variables:

#### Dimensions and positions
* `length` or `l`: The total number of LEDs.
* `index` or `i`: The sequential position of a LED.
* `width` or `w`: The width of the matrix. Equivalent to `length` on a strip.
* `height` or `h`: The height of the matrix. Always 1 on a strip.
* `x`: The x-coordinate of an LED in a matrix. Equivalent to `i` on a strip.
* `y`: The y-coordinate of an LED in a matrix. Always 0 on a strip.

#### Animation seeds
* `beat` or `b`: An incremental value that ticks every update cycle.
* `random[1-4]` or `r[1-4]`: An array of 4 random values between 0 and 1 for every update cycle.
* `pixelRandom` or `pr`: A random value between 0 and 1 unique for every LED for every update cycle.

#### Time
* `time` or `t`: Numbers of milliseconds since January 1, 1970 00:00:00 GMT.
* `year` or `yr`: The current year in four digits.
* `month` or `mo`: The current month between 1 and 12.
* `date` or `d`: The current date or day of the month.
* `day`: The current day of the week between 1 and 7.
* `hour` or `hr`: The current hour of the day between 0 and 23.
* `minute` or `m`: The current minute of the hour.
* `second` or `s`: The current second of the minute.
* `millisecond` or `ms`: The current millisecond of the second.

### Examples
For all examples, we will use a LED strip with 100 LEDs or a LED matrix with 256 LEDs in a 16 by 16 configuration. Many examples will only work as intended on strips with individually addressable LEDs.

#### Color cycle

**H**: `beat`

The beat variable increments by 1 on every update cycle. By applying this to the hue channel, it will cycle around the color wheel the channel represents by 1 degree per update cycle. To speed up or slow down the color cycle, you may multiply the `beat` variable by a value higher or lower than 1 respectively. That's all we need!

#### Flowing rainbow
First, let's create a static rainbow.

**H**: `index / length * 360`

To map a rainbow along the length of our LED strip, we will cycle around the 360 degrees of the hue channel. By diving `i` (the index of each LED) by `length` (the total length of the strip), each LED will get a hue value between 0 and 1 incrementing from the beginning to the end of the strip. The 30th LED, for example, will have a hue value `30 / 100 = .3`. Because the hue channel is based on a color wheel, we must multiply these values by 360 degrees, because values between 0 and 1 are all still red. Bingo! Now our LEDs are all mapped to a color. The 30th LED will now have a hue value `30 / 100 * 360 = 108`, a shade of green. Let's make it flow!

**H**: `index / length * 360 + beat`

To make the rainbow flow, we need an animation seed. By adding the `beat` variable, our values will shift forward 1 degree every update cycle. This makes each LED cycle through the color wheel, but because they all have a different starting point on the color wheel, it will appear to move across the length of the strip!
