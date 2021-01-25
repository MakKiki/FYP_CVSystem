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

    if (!req.body.email || !req.body.password) return res.status(401).send("Please input the email address and the password");

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
      req.session.role = person.role;

      if (person.role == "user") {
        var cv = await CV.findOne({ belongTo: person.id });
        if (!cv) cv = null;

        req.session.userID = person.id;
        req.session.progressingCV = cv;
        req.session.CV = person.CV;
        req.session.link = person.link;
        req.session.reloadCV = "";
        req.session.reloadStatus = "false";
      }

      sails.log("[Session] ", req.session);

      if (req.wantsJSON) {
        return res.json({ url: "/main" }); // for ajax request
      } else {
        return res.redirect("/main"); // for normal request
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

    var user = await User.findOne({ email: req.body.User.email });
    if (user) return res.view("pages/signupResult", { result: "fail" });

    req.body.User.role = "user";

    await User.create(req.body.User);

    return res.view("pages/signupResult", { result: "success" });
  },
};
