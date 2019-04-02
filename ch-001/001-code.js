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
