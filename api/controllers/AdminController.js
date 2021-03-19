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
};
