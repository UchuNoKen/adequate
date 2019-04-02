/**
 * Ch.2 First-Class Functions
 *
 */

// A quick review ------------------------------------------------------------

// JS functions can be passed as data, returned from functions, and assigned to variables
// This makes them first class

// Ex.

let hi = name => {
  return `Hi ${name}`;
};

let greeting = name => {
  return hi(name);
};

// Can also be written as:

let greeting = hi;

greeting("there"); // 'Hi there'

// Ex.

// ignorant
let getServerStuff = function(callback) {
  return ajaxCall(function(json) {
    return callback(json);
  });
};

// enlightened
let getServerStuff = ajaxCall;

// Here is why this is equivalent

// this line
return ajaxCall(function(json) {
  return callback(json);
});

// is the same as this line
return ajaxCall(callback);

// so refactor getServerStuff
let getServerStuff = function(callback) {
  return ajaxCall(callback);
};

// ...which is equivalent to this
let getServerStuff = ajaxCall; // <-- look mum, no ()'s

// Once more for understanding

var BlogController = (function() {
  let index = function(posts) {
    return Views.index(posts);
  };

  let show = function(post) {
    return Views.show(post);
  };

  let create = function(attrs) {
    return Db.create(attrs);
  };

  let update = function(post, attrs) {
    return Db.update(post, attrs);
  };

  let destroy = function(post) {
    return Db.destroy(post);
  };

  return {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  };
})();

// Example of a bloated controller, can be re-written as:

let BlogController2 = {
  index: Views.index,
  show: Views.show,
  create: Db.create,
  update: Db.update,
  destroy: Db.destroy
};

// Why Favor First Class --------------------------------------------------------------

// If httpGet changes, the wrapper function need change as well
httpGet("/post/2", function(json) {
  return renderPost(json);
});

// go back to every httpGet call in the application and explicitly
// pass err along.

httpGet("/post/2", function(json, err) {
  return renderPost(json, err);
});

// httpGet as first class function
// renderPost is called from within httpGet with however many arguments it wants
httpGet("/post/2", renderPost);

// naming first class functions is a challenge

// specific to our current blog
var validArticles = function(articles) {
  return articles.filter(function(article) {
    return article !== null && article !== undefined;
  });
};

// same as

// vastly more relevant for future projects
var compact = function(xs) {
  return xs.filter(function(x) {
    return x !== null && x !== undefined;
  });
};
