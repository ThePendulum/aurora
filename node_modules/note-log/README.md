# Note
Minimal logging prettifier for Node.js.

## Usage
### Installation
```sh
npm install note-log --save`
```

### Syntax
```javascript
note([handle] [, debugLevel] [, obj1 [, objN]]);
```
The handle and debug level are omittable, but exposes more than one logged values to being misinterpreted as a handle or debug level.

## Configuration
All configuration is optional.

```javascript
note.config({
    dateFormat: 'YYYY-MM-DD HH:mm:ss',
    dateColor: 'green',
    brackets: ['[', ']'],
    debugLevels: ['INFO', 'WARN', 'ERRO'],
    debugLevelColors: ['cyanBright', 'yellowBright', 'redBright'],
    debugTextColors: [null, 'yellowBright', 'redBright'],
    autoError: 2,
    handleLength: 6,
    handlePadding: '_',
    defaultHandle: 'app',
    handleColor: 'cyan',
    capitalizeHandle: true
});
```

### dateFormat
Please consult the [Moment.js documentation](http://momentjs.com/docs/#/displaying/format/) for a detailed overview of all format options.

### dateColor, debugLevelColors, debugTextColors, handleColor
Please consult the [cli-color documentation](https://github.com/medikoo/cli-color) for a detailed overview of all color options. To apply both a foreground and a background color, use an array specifying both, e.g. `['blue', 'bgYellow']`. To remove any default coloring, specify `null` or `undefined`. debugLevelColors affects the color of the debug level indicator only; debugTextColors applies to logged values.

### autoError
Debug level to escalate to when error is detected. `false` to disable.

### handleLength
Length of handle in characters. `0` to inherit from handle.
