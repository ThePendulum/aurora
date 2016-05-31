# aurora ws28xx Remote for Raspberry Pi

# Installation
aurora relies on Node.js, which is best installed through [nvm](https://github.com/creationix/nvm). Node.js comes with a package manager npm, which is used to install aurora's dependencies:

`npm install`

To start aurora, run `app.js` through node:

`node app`

## Modifiers
Modifiers are modules that define the values of each pixel. Modifier modules may export a function for one or multiple stages:

### Init
```mod.init(leds)```
This is called once on run time.

### Pre
```mod.pre(leds, init)```
This is called once for every refresh cycle, and receives the result of the init method as an argument.

### Each
```mod.each(leds, init, pre)```
This is called once for every LED for every refresh cycle, and receives the result of the init and pre methods as arguments.
