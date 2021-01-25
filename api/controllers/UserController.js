/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // check association
  populate: async function (req, res) {
    var model = await User.findOne(req.params.id).populate("have");

    if (!model) return res.notFound();

    return res.json(model);
  },

 

  // submit CV
  submitCV: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.session.CV = req.body.CV;
    req.session.link = req.body.link;

    var user = await User.update(req.session.userID)
      .set({
        CV: req.body.CV,
        link: req.body.link,
      })
      .fetch();

    if (user.length == 0) return res.notFound();

    if (req.wantsJSON) {
     // sails.log("[Session] ", req.session);
      return res.json({ message: "✔️ Successfully Submited ✔️", url: "/main" }); // for ajax request
    } else {
      return res.redirect("/main"); // for normal request
    }
  },

  //deleteCV
  deleteCV: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.session.CV = "";
    req.session.link = "";

    var user = await User.update(req.session.userID)
      .set({
        CV: "",
        link: "",
      })
      .fetch();

    if (user.length == 0) return res.notFound();

    if (req.wantsJSON) {
    //  sails.log("[Session] ", req.session);
      return res.json({ url: "/main" }); // for ajax request
    } else {
      return res.redirect("/main"); // for normal request
    }
  },

  // reloadCV
  reloadCV: async function (req, res) {
    sails.log("[heloo] ");
    req.session.reloadCV = req.body.CV;
    req.session.reloadStatus = req.body.status;
   sails.log("[Session] ", req.session.reloadCV);
    return res.redirect("/customize");
  },
};
