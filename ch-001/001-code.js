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
