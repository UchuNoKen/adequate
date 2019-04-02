/**
 * Ch.3 Pure Functions
 *
 */

// A pure function is a function that, given the same input, will always return the same
// output and does not have any observable side effect.

// Ex.
//  - slice and splice
//  - virtually the same, but vastly different

// slice is pure
// splice has side effects

let xs = [1, 2, 3, 4, 5];

// pure
xs.slice(0, 3); // [1, 2 , 3]

xs.slice(0, 3); // [1, 2 , 3]

xs.slice(0, 3); // [1, 2 , 3]

// impure
xs.splice(0, 3); // [1, 2, 3]

xs.splice(0, 3); // [4, 5]

xs.splice(0, 3); // []

// ! splice is mutating the originally array

// Ex.

// impure
let minimum = 21; // depends on mutable variable

let checkAge = function(age) {
  return age >= minimum;
};

// pure
let checkAge = age => {
  let minimum = 21;
  return age >= minimum;
};

// pure with immutable minimum
let checkAge = age => {
  let immutableState = Object.freeze({
    minimum: 21
  });
  return age >= immutableState.minimum;
};

// Side effects ------------------------------------------------------------------

// A side effect is a change of system state or observable interaction with the
// outside world that occurs during the calculation of a result

// my include but limited to:
//  - changing the file system
//  - inserting a record into a database
//  - making an http call
//  - mutations
//  - printing to the screen/logging
//  - obtaining user input
//  - querying the DOM
//  - accessng system state

// ! Any interaction with the world outside of a function is a side effect

// ! Side effects should be contained and ran in a controlled way

// You can think of functions as mappings of input to output

// The Case for Purity --------------------------------------------------------------

// Cacheable

// ! Pure functions can always be cached by input, typically done using memoization

let squareNumber = memoize(x => x * x);

squareNumber(4); // 16

squareNumber(4); // returns cache for input 4

squareNumber(5); // 25

squareNumber(5); // returns cache for input 5

// simplified implementation

let memoize = f => {
  let cache = [];

  return function() {
    let arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  };
};

// You can transform some impure functions into pure ones by delaying evaluation:

let pureHttpCall = memoize(function(url, params) {
  return function() {
    return $.getJSON(url, params);
  };
});

// we don't actually make the http call, but instead return a function that will
//   do so when called

// Our memoize function works just fine, though it doesn't cache the results of the
//   http call, rather it caches the generated function.

// Takeaway that functions can be cached, no matter how destructive
