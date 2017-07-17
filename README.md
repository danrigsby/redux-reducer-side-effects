# redux-reducer-side-effects
<p align="center">
  <a href="https://circleci.com/gh/danrigsby/redux-reducer-side-effects">
    <img src="https://circleci.com/gh/danrigsby/redux-reducer-side-effects.svg?style=svg" alt="build status" />
  </a>
  <a href="https://npmjs.org/package/redux-reducer-side-effects">
    <img src="https://img.shields.io/npm/v/redux-reducer-side-effects.svg" alt="npm version" />
  </a>
  <a href="https://github.com/danrigsby/redux-reducer-side-effects/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/redux-reducer-side-effects.svg" alt="license" />
  </a>
  <a href='https://coveralls.io/github/danrigsby/redux-reducer-side-effects?branch=master'>
    <img src='https://coveralls.io/repos/github/danrigsby/redux-reducer-side-effects/badge.svg?branch=master' alt='Coverage Status' />
  </a>
</p>

Easy to follow side effect library for redux reducers.

## Background
### What is a [Side Effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science))?
Anything that modifies some state outside its scope or has an observable interaction with its calling functions or the outside world beyond returning a value.

In redux, this means if your reducer does anything beyond just returning the new state for that reducer, its a side effect and needs to be handeld as such.

### Why are Side Effect Harmful?
_TODO_
### Why does this work?
_TODO_
### What does this library do for me?
_TODO_

## Installation
``` sh
# npm
npm install redux-reducer-side-effects --save

# yarn
yarn add redux-reducer-side-effects --dev
```

## Usage
### 1. Wire up the [Middleware](http://redux.js.org/docs/advanced/Middleware.html)
Simply add the [middleware](http://redux.js.org/docs/advanced/Middleware.html) when you create your redux store.

``` javascript
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import addSideEffectMiddleware from 'redux-reducer-side-effects';
import reducers from './reducers';

export default function configureStore() {
  const enhancers = compose(
    applyMiddleware(
      addSideEffectMiddleware()
    )
  );

  return createStore(reducers, {}, enhancers);
}
```

Optionally, the `addSideEffectMiddlware` can take in an options object that defines:
1. `timeout`: The default timeout in milliseconds for all side effects (defaults to 0 or no timeout)

``` javascript
  applyMiddleware(
    addSideEffectMiddleware({ timeout: 1000 }) // 1 second
  )
```
### 2. Add to Reducers

The `addSideEffectMiddlware` adds a new method on the redux reducer `action` called: `addSideEffect`.  
This method takes in a function that is passed the entire redux `store`.  This allows the side effect to `getState()` or `dispatch` new actions onto the store.

``` javascript
action.addSideEffect((store) => {
  // Your side effect goes here such as:
  store.dispatch.newAction(action.myNewAction(store.getState().myData));
});
```

Optionally you can also pass in an object to `addSideEffect` that defines two properties:
1. `effect`: the side effect function as defined above
2. `timeout`: a timeout in milliseconds to wrap around the `effect` function call

``` javascript
action.addSideEffect({
  effect: (store) => {
    // Your side effect goes here such as:
    store.dispatch.newAction(action.myNewAction(store.getState().myData));
  }
  timeout: 1000 // 1 second
});
```

#### Options
#### Example Reducer
``` javascript
export default (state, action) => {
  switch (action.type) {
    case: 'MY_ACTION': {
      const newState = // Perform what ever you need to do here to get your new state

      action.addSideEffect((store) => {
        // Your side effect goes here such as:
        store.dispatch.newAction(action.myNewAction(store.getState().myData));
      });

      // Can add more side effects on action.addSideEffect

      return newState;
    }
    default: {
      return state
    }
  }
}

## License
`redux-reducer-side-effects` is licensed under the [MIT License](LICENSE).
