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
### 1. Wire up the Middleware
_TODO_
### 2. Add to Reducers
_TODO_

#### Example Reducer
``` javascript
export default (state, action) => {
  switch (action.type) {
    case: 'MY_ACTION': {
      const newState = // Perform what ever you need to do here to get your new state

      action.addSideEffect((store) => {
        // Your side effect goes here
        store.dispatch.newAction(action.myNewAction());
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
