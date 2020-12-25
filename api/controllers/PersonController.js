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

    if (!req.body.email || !req.body.password) return res.badRequest();

    var person = await Person.findOne({ email: req.body.email });

    if (!person) return res.status(401).send("Account not found");

    if (person.password != req.body.password)
      return res.status(401).send("Wrong Password");

    req.session.regenerate(function (err) {
      if (err) return res.serverError(err);

      req.session.email = person.email;
      req.session.firstName = person.firstName;
      req.session.lastName = person.lastName;
      req.session.role = person.role;
      req.session.userID = person.id;
      req.session.CV = person.CV;

      sails.log("[Session] ", req.session);

      if (req.wantsJSON) {
        return res.json({ message: "Sucessfully login", url: "/main" }); // for ajax request
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

    if (!req.body.Person) return res.badRequest("Form-data not received.");

    req.body.Person.role = "user";

    await Person.create(req.body.Person);

    return res.redirect("/signup/success");
  },

  // save CV
  save: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.session.CV = req.body.CV;

    var user = await Person.update(req.session.userID)
      .set({
        CV: req.body.CV,
      })
      .fetch();

    if (user.length == 0) return res.notFound();

    if (req.wantsJSON) {
      sails.log("[Session] ", req.session);
      return res.json({ message: "Successfully saved", url: "/create" }); // for ajax request
    } else {
      return res.redirect("/create"); // for normal request
    }
  },
};
