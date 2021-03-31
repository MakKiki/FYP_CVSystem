/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //login
  login: async function (req, res) {
    if (req.method == "GET") return res.view("pages/login");

    if (!req.body.email || !req.body.password)
      return res
        .status(401)
        .send("Please input the email address and the password");

    var person = await User.findOne({ email: req.body.email });

    if (!person) {
      person = await Admin.findOne({ email: req.body.email });
      if (!person) {
        return res.status(401).send("Account not found");
      }
    }

    if (person.password != req.body.password)
      return res.status(401).send("Wrong Password");

    req.session.regenerate(async function (err) {
      if (err) return res.serverError(err);

      req.session.firstName = person.firstName;
      req.session.lastName = person.lastName;
      req.session.profile = person.profile;
      req.session.role = person.role;

      if (person.role == "user") {
        req.session.userID = person.id;
        req.session.progressingCV = null;
        req.session.reloadCV = "";
        req.session.reloadStatus = "false";

        sails.log("[Session] ", req.session);

        if (req.wantsJSON) {
          return res.json({ url: "/main" }); // for ajax request
        } else {
          return res.redirect("/main"); // for normal request
        }
      }

      if (person.role == "admin") {
        req.session.adminID = person.id;
        req.session.userID = '';
        req.session.progressingCV = null;
        req.session.reloadCV = "";
        req.session.reloadStatus = "false";

        sails.log("[Session] ", req.session);

        if (req.wantsJSON) {
          return res.json({ url: "/admin_main" }); // for ajax request
        } else {
          return res.redirect("/admin_main"); // for normal request
        }
      }
    });
  },

  //logout
  logout: async function (req, res) {
    req.session.destroy(function (err) {
      if (err) return res.serverError(err);

      return res.redirect("/login"); // for normal request
    });
  },

  //signup
  signup: async function (req, res) {
    if (req.method == "GET") return res.view("pages/signup");

    if (!req.body.User) return res.badRequest("Form-data not received.");

    //check whether the email has been registered
    var user = await User.findOne({ email: req.body.User.email });
    if (user) return res.view("pages/signupResult", { result: "fail" });
    var admin = await Admin.findOne({ email: req.body.User.email });
    if (admin) return res.view("pages/signupResult", { result: "fail" });

    req.body.User.role = "user";

    await User.create(req.body.User);

    return res.view("pages/signupResult", { result: "success" });
  },

  //setting
  setting: async function (req, res) {
    //GET
    if (req.method == "GET") {
      if (req.session.role == "user") {
        var model = await User.findOne({ id: req.session.userID });
      } else {
        var model = await Admin.findOne({ id: req.session.adminID });
      }

      if (!model) return res.badRequest();

      return res.view("pages/setting", { person: model });
    }

    //POST
    //check whether the email has been registered
    //to see whether repeated email in User
    var repeat = await User.findOne({ email: req.body.email });
    //for user
    if (req.session.role == "user") {
      if (repeat) {
        //check whether the repeat is due to unchanged email or conflict with others
        //if due to unchanged email
        if (repeat.id == req.session.userID) {
          //check whether conflicted with Admin
          repeat = await Admin.findOne({ email: req.body.email });
        } else {
          //repeated email in User
          return res.status(401).send("This email has been registered");
        }
        //Conflict with Admin
        if (repeat)
          return res.status(401).send("This email has been registered");
      } else {
        //no repeated
        //check whether conflicted with Admin
        repeat = await Admin.findOne({ email: req.body.email });
        //Conflict with Admin
        if (repeat)
          return res.status(401).send("This email has been registered");
      }
    } else {
      //for admin (No check admin because only 1 admin exists)
      //repeated with User
      if (repeat)
        return res.status(401).send("This email has been registered");
    }

    if (req.session.role == "user") {
      var person = await User.update(req.session.userID)
        .set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          profile: req.body.profile,
        })
        .fetch();
    } else {
      var person = await Admin.update(req.session.adminID)
        .set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          profile: req.body.profile,
        })
        .fetch();
    }
    if (!person) return res.badRequest("Update Failed. Please try again.");

    req.session.firstName = req.body.firstName;
    req.session.lastName = req.body.lastName;
    req.session.profile = req.body.profile;

    //sails.log("[Session] ", req.session);
    if (req.wantsJSON) {
      return res.json({
        message: "✔️ Successfully Updated ✔️",
        url: "/setting",
      }); // for ajax request
    } else {
      return res.redirect("/setting"); // for normal request
    }
  },
};
