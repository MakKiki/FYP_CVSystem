/**
 * CVController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // check association
  populate: async function (req, res) {
    var model = await CV.findOne(req.params.id).populate("include");

    if (!model) return res.notFound();

    return res.json(model);
  },

  //save cv data
  saveData: async function (req, res) {
    if (req.method == "GET") return res.view("pages/users/inputData");

    req.session.progressingCV = req.body;

    var user = await User.update(req.session.userID)
      .set({
        progressingCV: req.body,
      })
      .fetch();

    if (user.length == 0) return res.notFound();

    //sails.log("[Session] ", req.session);

    if (req.wantsJSON) {
      return res.json({ message: "✔️ Successfully Saved ✔️", url: "/input" }); // for ajax request
    } else {
      return res.redirect("/input"); // for normal request
    }
  },

  //submit cv data
  submitData: async function (req, res) {
    if (req.method == "GET") return res.view("pages/users/inputData");

    req.session.progressingCV = req.body.CV;

    if (!req.body.CV) return res.badRequest("Form-data not received.");

    req.body.CV.belongTo = req.session.userID;
    await CV.create(req.body.CV);

    // sails.log("[Session] ", req.session);
    return res.view("pages/users/step2");
  },

  //show template1
  showTemplate1: async function (req, res) {
    var model = await CV.findOne(req.session.progressingCV.id);

    if (!model) return res.notFound();

    return res.view("pages/users/template1", { cv: model });
  },
};
