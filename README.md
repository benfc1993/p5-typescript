# p5-typescript

A OOP framework to make using p5 with typescript that much smoother.

<p style="text-align: center; display: flex; justify-content: center; gap: 20px;align-items: center;">
<img alt="npm" src="https://img.shields.io/npm/v/p5-typescript">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/benfc1993/p5-typescript"><img alt="npm" src="https://img.shields.io/npm/dw/p5-typescript">
</P>

**Please note any component or file which wants to use anything from the p5 library p5 will need to be imported into the file**

```typescript
import p5 from 'p5'
```

## Project setup

From a blank project you can use a script to setup a p5 typescript project. once you have initialised npm and installed p5-typescript you can run:

`npm exec p5-ts-setup`

or

`yarn exec p5-ts-setup`

This will create a project using p5-typescript which can bundle and run in the browser.

---

# Index

-   [Sketch](#sketch)

    -   [Creating a Sketch](#sketch)
    -   [Adding Items to the Sketch](#adding-items-to-the-sketch)

-   [Component Class](#components)

-   [Events](#events)

-   [Input](#input)

-   [Extending p5](#extending-p5)

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

| Option        | value                                           | default     | details                                                                                           |
| ------------- | ----------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `fullscreen`  | `boolean`                                       | false       | This will create a canvas and set the size to the window size. This is updated on windiw resize . |
| `canvasColor` | `{r: number, g: number, b: number, a?: number}` | null        | If provided this will set the background color at the start of the draw function.                 |
| `divId`       | `string`                                        | `undefined` | This will cause the canvas to be rendered in the HTML element with the provided id.               |

## Adding Items to the sketch

### addComponent

The provided `Component` class is designed to make it as easy as possible to add items to your sketch. Any class inheriting the `Component` class will be automatically added to the sketch lifecycle and updated on the draw call. These classes can also easily be added to the sketch:

```typescript
class MyComponent extends Component {
    constructor(SketchInstance: Sketch, name: string, size: number) {
        super(SketchInstance)
        ...
    }
}

const sketch = new Sketch(
    ...
    p.setup = () => {
        sketch.addComponent(MyComponent, 'Argument', 24)
    }
    ...
)
```

The `addComponent` function can be called anywhere in the application as long as you have access to the sketch instance.

```typescript
class MyComponent extends Component {
    child: ChildComponent
    constructor(SketchInstance: Sketch, name: string, size: number) {
        super(sketchInstance)
        this.child = this.sketchInstance.addComponent(
            ChildComponent,
            'Child component',
            12
        )
    }
}
```

You can also add / update items within the sketch by adding the logic to the initial function.

---

## Component

This is a useful way to create objects which live within the sketch lifecycle. any class which implements the Component class will have the draw function called after the sketch draw function. A component can be created as below:

```typescript
class Circle extends Component {
    position!: p5.Vector
    radius!: number

    constructor(sketchInstance: Sketch) {
        super(sketchInstance)
        this.setup()
    }
    setup(): void {
        this.position = p5.Vector()
        this.radius = 50
    }

    onLoad(): void {
        console.log('I have been initialized')
    }

    draw(): void {
        this.sketch.circle(this.position.x, this.position.y, this.radius * 2)
    }
}
```

### Default properties

**zIndex** - Used to determine the order of rendering and input events. A higher number will render the element on top. By default this is one but can be overwritten by passing it to the Component constructor.

```typescript
class MyComponent extends Component {
    constructor(sketchInstance: sketch) {
        super(sketchInstance, 5 /* zIndex will be set to 5 */)
    }
}
```

**position / pixelPosition** - Can be used for positioning the element. Can be provided as a number, string or function. strings allow for proportional positioning e.g.

{ x: '50%', y: '50%' }

The value of this property can be used by using the pixelPosition property on the class.

use the position property to set the values and the pixelPosition method to get the calculated position.

---

## Lifecyle Events

There are 2 lifecycle events, these are called on the methods for Component classes.

**onLoad**
This is called when a component is initialised.

**draw**
This is called in the p5 `draw` function.

---

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

myFunction(2) //output: "4" "Message"
```

---

## Input

There is an Input manager included which will listen for mouse and keyboard events.

to use these events on component you can subscribe to these events.

The subscribed function must return a boolean. If true is returned the event is flagged as handled and will not bubble to other subscribers.

### Subscribing to input events

```typescript
class MyComponent extends Component {
    ...
    constructor(sketchInstance: Sketch) {
        this.subscribeToKeyPressed(this.onKeyPressed.bind(this))
    }
    ...

    onKeyPressed(event: KeyboardEvent) {
        if (event.key === 'a') {
            console.log('A pressed')
            return true
        }
        return false
    }
}
```

### unsubscribing

The subscribe function will return an unsubscribe function. This can be called to remove the listener from the list

### Key is down

There is a function on the input manager which will take in a name of a modifier key and return wether the key is down or not.

```typescript
const shiftIsHeld: boolean = this.input.isKeyDown('SHIFT')
```

---

## Development

### Setup

clone the repo and use `yarn` to install dependancies

To start the example use `yarn start`. This will start esbuild serving the example on `:8000` by default.

### Making changes

The `lib` files are in `src/lib`.

To create a production build use `yarn build`.

Please feel free to submit Pull requests, I will try to get to them as soon as I can.
