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

  //main page
  main: async function (req, res) {
    if (req.method == "GET") {
      var models = await CV.find({ where: { belongTo: req.session.userID } });

      if (!models) models = null;

      return res.view("pages/users/main", { cv: models });
    }
  },

};
