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

    const match = await sails.bcrypt.compare(req.body.password, person.password);

    if (!match) return res.status(401).send("Wrong Password");

    req.session.regenerate(function (err) {
      if (err) return res.serverError(err);

      req.session.email = person.email;
      req.session.firstName = person.firstName;
      req.session.lastName = person.lastName;
      req.session.role = person.role;

      sails.log("[Session] ", req.session);

      if (req.wantsJSON) {
        return res.json({ message: "Sucessfully login.", url: "/main" }); // for ajax request
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
};
