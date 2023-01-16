# p5-typescript

<p style="text-align: center; display: flex; justify-content: center; gap: 20px;align-items: center;">
<img alt="npm" src="https://img.shields.io/npm/v/p5-typescript">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/benfc1993/p5-typescript">
</P>

An OOP framework to make using p5 with typescript that much smoother.

**Please note any component or file which wants to use anything from the p5 library p5 will need to be imported into the file**

```typescript
import p5 from 'p5'
```

You will also need to add a `*.d.ts` file with the following content to your root directory:

```typescript
import * as p5Global from 'p5/global'
import module = require('p5')
export = module
export as namespace p5

declare global {
    interface p5 {}
    interface Window {
        setup: any
        draw: any
    }
}
```

This will setup the p5 types

## Sketch

The sketch component takes in a p5 sketch function. Any p5 sketch functions can be added. This will be used to initialize the p5 sketch instance on load.

Whilst the intention is that components will be used to add content to the sketch, you can use the sketch as any other class and access the sketch instance on the `sketch` property.

```typescript
export const sketch = new Sketch(
    (p: p5) => {
        p.preload = () => {}
        p.setup = () => {
            p.createCanvas(800, 400)
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

| Option        | value                                           | default | details                                                                               |
| ------------- | ----------------------------------------------- | ------- | ------------------------------------------------------------------------------------- |
| `fullscreen`  | `boolean`                                       | false   | This will set the canvas size to the window size and amend when the screen is resized |
| `canvasColor` | `{r: number, g: number, b: number, a?: number}` | null    | If provided this will set the background color at the start of the draw function      |

---

## Component

This is a useful way to create objects which live within the sketch lifecycle. any class which implements the Component class will have the draw function called after the sketch draw function. A component can be created as below:

```typescript
export class Circle extends Component {
    position!: p5.Vector
    radius!: number

    constructor() {
        super()
    }
    setup(): void {
        this.position = p5.Vector()
        this.radius = 50
    }
    draw(): void {
        this.sketch.circle(this.position.x, this.position.y, this.radius * 2)
    }
}
```

---

## Extending p5 Functions

In order to extend the base sketch functions such as mousePressed, windowResized etc. There are two methods provided. Both are fully type safe.

The `addFunction` method can be used to assign to a function which may not be initialized within the sketch instance.

The extension method `Function.prototype.addFunction` can be used on any initialized function.

These two methods are not limited to p5 functions.

### **addFunction**

The `addFunction` method allows you to add additional functionality to the body of the existing function. You can also pass arguments to the second function.

_**note:** The additional function must include all arguments of the first. All arguments are pased to the additional function. Any additional arguments you wish to pass can be added after these_

#### **Without arguments**

```typescript
const myFunction = () => {
    console.log('Hello')
}

const myAdditionalFunction = () => {
    console.log('world')
}

myFunction = addFunction(myFunction, myAdditionalFunction)

myFunction() //output: "Hello" "world"
```

#### **With arguments**

```typescript
const myFunction = (arg0: number) => {
    console.log(arg0 * 2)
}

const myAdditionalFunction = (arg0: number, arg1: string) => {
    console.log(arg1)
}

myFunction = addFunction(myFunction, myAdditionalFunction, 'Message')

myFunction(2) //output: "2" "Message"
```

---

### Function extension method

An extension method has been added to the function prototype. This allows you to add additional functionality to the body of the existing function.

_**note as above**: The additional function must include all arguments of the first. All arguments are pased to the additional function. Any additional arguments you wish to pass can be added after these_

#### **Without arguments**

```typescript
const myFunction = () => {
    console.log('Hello')
}

const myAdditionalFunction = () => {
    console.log('world')
}

myFunction = myFunction.addFunction(myAdditionalFunction)

myFunction() //output: "Hello" "world"
```

#### **With arguments**

```typescript
const myFunction = (arg0: number) => {
    console.log(arg0 * 2)
}

const myAdditionalFunction = (arg0: number, arg1: string) => {
    console.log(arg1)
}

myFunction = myFunction.addFunction(myAdditionalFunction, 'Message')

myFunction(2) //output: "2" "Message"
```

## Events

Events are a simple `pub/sub` implementation of a simple event system. This is currently used to link the Components to the lifecycle.

Events can pass data to subscribers via the data argument which is a generic type.

The `subscribe` method will return the `unsubscribe` method. Be aware you may need to bind this when subscribing a class method.

To trigger the event call the Events `raise` method.

```typescript
const myEvent = useEvent<string>()

const mySubscriber = (message: string) => {
    console.log(message)
}

const unsubscribe = myEvent.subscribe(mySubscriber)

myEvent.raise('Sent data') //Output: "Sent data"
```

---

## Development

### Setup

clone the repo and use `yarn` to install dependancies

To start the example use `yarn start`. This will start snowpack in dev mode which will serve the example on `:8080` by default.

### Making changes

The `lib` files are in `src/lib`.

To create a production build use `yarn build`.

Please feel free to submit Pull requests, I will try to get to them as soon as I can.
