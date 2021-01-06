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
};
