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

Easy to follow side effect library for redux reducers

## Background
### What is a [Side Effect](https://en.wikipedia.org/wiki/Side_effect_(computer_science))?
Anything that modifies some state outside its scope or has an observable interaction with its calling functions or the outside world beyond returning a value.

In redux, this means if your reducer does anything beyond just returning the new state for that reducer, its a side effect and needs to be handled as such.

However, often reducers will need to perform some kind of side effect. In these situations, you want to perform these
side effects "outside" of the reducer. For instance:
1. Inside of a reducer you may want to have the completion of some operation dispatch another operatop on the store.
2. Reducers should not know about one another direct, but may listen for well known actions between them. 

### What does this library do for me?
There are a few different side effect libraries out there, but many do more than you need or are hard to follow. Primary goal of this library is to introduce safe side effects in a powerful way, but be simple to read, understand, and implement.

For instance, say you have two reducers, one for login (loginReducer) and the other for content (contentReducer).  When a user logs in, you want to retrieve content, and when the user logs out, you want to remove the content.

```javascript
export default function contentReducer(state, action) {
  switch (action.type) {
    case: 'LOGIN': {
      action.addSideEffect((store) => {
        store.dispatch.getContent();
      });
      return state;
    }
    case: 'LOGOUT': {
      action.addSideEffect((store) => {
        store.dispatch.clearContent();
      });
      return state;
    }
    default: {
      return state
    }
  }
}
```
## Installation
``` sh
# npm
npm install redux-reducer-side-effects --save

# yarn
yarn add redux-reducer-side-effects
```

## Usage
### 1. Wire up the [Middleware](http://redux.js.org/docs/advanced/Middleware.html)
Simply add the [middleware](http://redux.js.org/docs/advanced/Middleware.html) when you create your redux [store](http://redux.js.org/docs/basics/Store.html).

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
```

### 3. (Optional) Get Information About Side Effects
The `addSideEffectMiddlware` adds a second new method on the redux reducer `action` called: `sideEffectInfo`.  
This method returns an object containing information about sideEffects:
1. `count`: the current number of side effects that will be executed.  this may be useful for testing or other operations
2. `options`: the original options passed into `addSideEffectMiddlware`. you may use this to look at the default `timeout` or to pass data from the middleware down to sideEffects

## License
`redux-reducer-side-effects` is licensed under the [MIT License](LICENSE).
