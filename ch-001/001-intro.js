// A brief encounter -----------------------------------------------------------

// A seagull application:
//  - when a flock conjoins, the flock becomes larger
//  - when the flock breeds, the flock increases by the number of seagulls with
//     whom they are breeding

// ! This is an intentionally bad example of the assignment bases approach

let Flock = function(n) {
  this.seagulls = n;
};

Flock.prototype.conjoin = function(other) {
  this.seagulls += other.seagulls;
  return this;
};

Flock.prototype.breed = function(other) {
  this.seagulls = this.seagulls * other.seagulls;
  return this;
};

let flock_a = new Flock(4);
let flock_b = new Flock(2);
let flock_c = new Flock(0);

let result = flock_a
  .conjoin(flock_c)
  .breed(flock_b)
  .conjoin(flock_a.breed(flock_b)).seagulls;

// ! This is bad
// It makes the point that state and mutable values are hard to follow,
//   even in small examples

// --> A More Functional Approach

let conjoin = function(flock_x, flock_y) {
  return flock_x + flock_y;
};
let breed = function(flock_x, flock_y) {
  return flock_x * flock_y;
};

let flock_a = 4;
let flock_b = 2;
let flock_c = 0;

let result = conjoin(breed(flock_b, conjoin(flock_a, flock_c)), breed(flock_a, flock_b));

// => 16

// In the two custom functions, we're just working with addition (conjoin), and
//    multiplication (breed).

// --> Rename custom functions to 'multiply' and 'add'

let add = (x, y) => x + y;
let multiply = (x, y) => x * y;

let flock_a = 4;
let flock_b = 2;
let flock_c = 0;

let result = add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));

// => 16

// ! Property knowledge

// associative : (2 + 3) + 5 = 2 + (3 + 5)
add(add(x, y), z) === add(x, add(y, z));

// commutative : 5 + 1 = 1 + 5
add(x, y) === add(y, x);

// identity : 5 + 0 = 5
add(x, 0) === x;

// distributive : 5 x (1 + 3) = (5 * 1) + (5 * 3)
multiply(x, add(y, z)) === add(multiply(x, y), multiply(x, z));

// --> Simplify the seagull app using the aforementioned properties

// Original line
add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));

// Apply the identity property to remove the extra add
// (add(flock_a, flock_c) === flock_a)
add(multiply(flock_b, flock_a), multiply(flock_a, flock_b));

// Apply distributive property to achieve the result
multiply(flock_b, add(flock_a, flock_a));

// The functional approach makes for code that is:
//      - easy to read
//      - easy to test
//      - easy to debug and maintain

// This is better than the anything goes approach of imperative programming
