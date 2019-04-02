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
