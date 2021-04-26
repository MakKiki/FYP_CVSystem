/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //main page
  main: async function (req, res) {
    if (req.method == "GET") {
      var models = await User.find();

      if (!models) models = null;

      return res.view("pages/admin/main", { users: models });
    }
  },

  //user_info page
  user_info: async function (req, res) {
    //GET
    if (req.method == "GET") {
      var model = await User.findOne(req.params.id);
      if (!model) return res.notFound();

      var CVmodels = await CV.find({ where: { belongTo: req.params.id } });

      req.session.userID = req.params.id;

      return res.view("pages/admin/userInfo", { user: model, cvs: CVmodels });
    }

    //POST
    //check whether the email has been registered
    //to see whether repeated email in User
    var repeat = await User.findOne({ email: req.body.email });

    if (repeat) {
      //check whether the repeat is due to unchanged email or conflict with others
      //if due to unchanged email
      if (repeat.id == req.body.id) {
        //check whether conflicted with Admin
        repeat = await Admin.findOne({ email: req.body.email });
      } else {
        //repeated email in User
        return res.status(401).send("This email has been registered");
      }
      //Conflict with Admin
      if (repeat) return res.status(401).send("This email has been registered");
    } else {
      //no repeated
      //check whether conflicted with Admin
      repeat = await Admin.findOne({ email: req.body.email });
      //Conflict with Admin
      if (repeat) return res.status(401).send("This email has been registered");
    }

    var user = await User.update(req.body.id)
      .set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        profile: req.body.profile,
      })
      .fetch();

    if (!user) return res.badRequest("Update Failed. Please try again.");

    //sails.log("[Session] ", req.session);
    if (req.wantsJSON) {
      return res.json({
        message: "✔️ Successfully Updated ✔️",
        url: "/user/info/" + req.body.id,
      }); 
    } else {
      return res.redirect("/user/info/" + req.body.id); 
    }
  },

  //delete Account
  deleteUser: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    var model = await User.destroy(req.params.id).fetch();

    if (model.length == 0) return res.notFound();

    if (req.wantsJSON) {
      //  sails.log("[Session] ", req.session);
      return res.json({
        message: "✔️ Successfully Deleted ✔️",
        url: "/admin_main",
      }); // for ajax request
    } else {
      return res.redirect("/admin_main"); // for normal request
    }
  },
};
