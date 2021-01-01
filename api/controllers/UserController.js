/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // save CV
  saveCV: async function (req, res) {
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
      return res.json({ message: "✔️ Successfully saved ✔️", url: "/create" }); // for ajax request
    } else {
      return res.redirect("/create"); // for normal request
    }
  },

  //deleteCV
  deleteCV: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.session.CV = "";

    var user = await Person.update(req.session.userID)
      .set({
        CV: "",
      })
      .fetch();

    if (user.length == 0) return res.notFound();

    if (req.wantsJSON) {
      sails.log("[Session] ", req.session);
      return res.json({ url: "/main" }); // for ajax request
    } else {
      return res.redirect("/main"); // for normal request
    }
  },

  // reloadCV
  reloadCV: async function (req, res) {
    req.session.reloadCV = req.body.CV;
    sails.log("[Session] ", req.session);
    return res.redirect("/create");
  },
};
