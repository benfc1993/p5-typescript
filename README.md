# p5-ts

p5 typescript package to allow for ease of use. This is an OOP approach which allows for the features below.

## Sketch

The sketch component takes in a p5 sketch function, you may also pass options e.g.

```typescript
new Sketch(
    (p: p5) => {
        p.preload = () => {}
        p.setup = () => {
            p.createCanvas(p.windowWidth, p.windowHeight)
            p.background(47)
        }
        p.draw = () => {
            p.background(47)
        }
    },
    {
        fullscreen: true,
    }
)
```

### Options

| Option       | value     | default | details   |
| ------------ | --------- | ------- | --------- |
| `fullscreen` | `boolean` | false   | This will |
| `canvasColor`       | ``    |         |           |
|              |           |         |           |

## run

### npm

`npm i`

`npm start`

### yarn

`yarn`

`yarn start`
