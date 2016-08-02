## Vue-Redux-Mixin-Generator
A simple function that returns a reusable object of redux dispatch action functions thats pluggable to Vue's mixins option.


## Installation 
`npm install --save vue-mixin-generator`


## Why Should I Use This?
It allows to create reusable Mixins that utilizes [Vue](https://github.com/vuejs/vue), [revue](https://github.com/revue/revue) and [Redux](https://github.com/reactjs/redux)

#### Actions
```js
export const SET_USER = 'SET_USER';
export const setUser = (user) => ({type: SET_USER, user});

export const CLEAR_USER = 'CLEAR_USER';
export const clearUser = (user) => ({type: CLEAR_USER, user: {}});

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
export const updateUser = (user) => ({type: UPDATE_USER_INFO, user});
```

#### Reducers

```js
//Import all the actions
import * as actions from './actions';

function user(state = {}, action) {
	switch (action.type) {

		case actions.SET_USER:
			return action.user;

		case actions.CLEAR_USER:
			return action.user;

		case actions.UPDATE_USER_INFO:
			return {...state, ...action.user};

		default:
			return state
	}
}
```

## Params
```js
{
  prefix:  [optional], method name prefix {String},
  actions: required, array action methods {Array},
  store:   required, Store Class {Object}
}
```


## Example.
Create mixins that allow you to resuse methods that call `store.dispatch()` importable across your entire app.
```js
// Store & Actions
import store from './store.js';
import {setUser, clearUser, updateUser} from './actions.js';

// Mixin Generator
import VueMixinGen from 'reVueMixinGen';



/** Create New Mixin Object */
export const UserMixin = VueMixinGen({
  prefix: 'store',
  actions: [setUser, clearUser, updateUser],
  store: store
})


/** Result of function above. */

UserMixin = {
    methods: {
      storeSetUser: function(...params) {
        store.dispatch(setUser(...params))
      },
      storeClearUser: function(...params) {
        store.dispatch(clearUser(...params))
      },
      storeUpdateUser: function(...params) {
        store.dispatch(updateUser(...params))
      }
    }
}
```

## Adding to Vue component.

```js
import UserMixin from './mixins.js'

export default {
  template: require('./path/to/file.html'),
  mixins: [UserMixin]
}
```

## Methods Usage
When attaching a mixin to a component the methods become available via `this` just like any other method in the $vm scope.
EX:
``` js
import UserMixin from './mixins.js'

export default {
 template: require('./path/to/file.html'),
 mixins: [UserMixin],
 
 attached() {
    this.storeSetUser(this.user);
 }
}
```
