/**
 * Ch.4 Currying
 *
 */

// currying:
//   - the concept is that you can call a function with less arguments
//     than it expects
//   - it returns a function that takes the remaining arguments

// Ex.
// function expression
let add = function(x) {
  return function(y) {
    return x + y;
  };
};

// arrow functions
let add = x => {
  return y => {
    return x + y;
  };
};

// concise arrow functions
let add = x => y => x + y;

let increment = add(1);
let addTen = add(10);

increment(4); // 5
addTen(5); // 15

// add takes one argument, returns a function
// the retured function has the first argument via closure

// curried functions
