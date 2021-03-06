var User = require("../models/user");
var Post = require("../models/post");

module.exports = {
  index,
  new: newPost,
  create,
  show,
  edit,
  update
};

function update(req, res) {
  Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    post.save(function(err) {
      res.redirect("/posts");
    });
  });
}

function edit(req, res) {
  User.findById(req.session.passport.user, function(err, user) {
    Post.findById(req.params.id, function(err, post) {
      res.render("posts/edit", { post, user });
    });
  });
}

function show(req, res) {
  User.findById(req.session.passport.user, function(err, user) {
    Post.findById(req.params.id, function(err, post) {
      res.render("posts/show", { title: "Detail", post, user });
    });
  });
}

function create(req, res) {
  User.findById(req.session.passport.user, function(err, user) {
    var post = new Post(req.body);
    post.user.push(user);
    post.save(function(err) {
      if (err) return res.redirect("/posts/new");
      console.log(post);
      res.redirect("/posts");
    });
  });
}

function newPost(req, res) {
  User.findById(req.session.passport.user, function(err, user) {
    res.render("posts/new", { title: "Add Post", user });
  });
}

function index(req, res) {
  User.findById(req.params.id, function(err, user) {
    Post.find({}, function(err, post) {
      res.render("posts/index", {
        post,
        user: req.user,
        name: req.query.name
      });
    });
  });
}
