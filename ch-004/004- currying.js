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

let curry = require("lodash/curry");

let match = curry(function(what, str) {
  return str.match(what);
});

var replace = curry(function(what, replacement, str) {
  return str.replace(what, replacement);
});

var filter = curry(function(f, ary) {
  return ary.filter(f);
});

var map = curry(function(f, ary) {
  return ary.map(f);
});

// usage

match(/\s+/g, "hello world");
// [ ' ' ]

match(/\s+/g)("hello world");
// [ ' ' ]

var hasSpaces = match(/\s+/g);
// function(x) { return x.match(/\s+/g) }

hasSpaces("hello world");
// [ ' ' ]

hasSpaces("spaceless");
// null

filter(hasSpaces, ["tori_spelling", "tori amos"]);
// ['tori amos']

var findSpaces = filter(hasSpaces);
// function(xs) { return xs.filter(function(x) { return x.match(/\s+/g) }) }

findSpaces(["tori_spelling", "tori amos"]);
// ['tori amos']

var noVowels = replace(/[aeiouy]/gi);
// function(replacement, x) { return x.replace(/[aeiouy]/ig, replacement) }

var censored = noVowels("*");
// function(x) { return x.replace(/[aeiouy]/ig, '*') }

censored("Chocolate Rain");
// 'Ch*c*l*t* R**n'

// More to Currying -------------------------------------------------------------

// currying can be used to make new functions just by giving the base functions
// some arguments

// a function that works on single elements can be transformed to work on arrays by wrapping
// with map

let getChildren = x => {
  return x.childNodes;
};

let allChildren = map(getChildren); // from curried functions, not .map()

// ! Partial application: Giving a function fewer arguments than it expects

// Exercises --------------------------------------------------------------------
// * requires Ramda

var _ = require("ramda");

// Exercise 1
//==============
// Refactor to remove all arguments by partially applying the function.

var words = function(str) {
  return _.split(" ", str);
};

// Exercise 1a
//==============
// Use map to make a new words fn that works on an array of strings.

var sentences = undefined;

// Exercise 2
//==============
// Refactor to remove all arguments by partially applying the functions.

var filterQs = function(xs) {
  return _.filter(function(x) {
    return match(/q/i, x);
  }, xs);
};

// Exercise 3
//==============
// Use the helper function _keepHighest to refactor max to not reference any
// arguments.

// LEAVE BE:
var _keepHighest = function(x, y) {
  return x >= y ? x : y;
};

// REFACTOR THIS ONE:
var max = function(xs) {
  return _.reduce(
    function(acc, x) {
      return _keepHighest(acc, x);
    },
    -Infinity,
    xs
  );
};

// Bonus 1:
// ============
// Wrap array's slice to be functional and curried.
// //[1, 2, 3].slice(0, 2)
var slice = undefined;

// Bonus 2:
// ============
// Use slice to define a function "take" that returns n elements from the beginning of an array. Make it curried.
// For ['a', 'b', 'c'] with n=2 it should return ['a', 'b'].
var take = undefined;
