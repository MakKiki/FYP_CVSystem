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

    req.body.step = "step1";
    req.body.belongTo = req.session.userID;

    if (req.session.progressingCV == null) {
      await CV.create(req.body);
    } else {
      await CV.update(req.session.progressingCV.id).set({
        chiName: req.body.chiName,
        engName: req.body.engName,
        nickname: req.body.nickname,
        sex: req.body.sex,
        birth: req.body.birth,
        countryCode: req.body.countryCode,
        phone: req.body.phone,
        email: req.body.email,
        personWebLink: req.body.personWebLink,
        address: req.body.address,
        occupation: req.body.occupation,
        jobArea: req.body.jobArea,
        objective: req.body.objective,
        profile: req.body.profile,
        school: req.body.school,
        eduStartDate: req.body.eduStartDate,
        eduEndDate: req.body.eduEndDate,
        major: req.body.major,
        degree: req.body.degree,
        mark: req.body.mark,
        eduDescription: req.body.eduDescription,
        eduCertificate: req.body.eduCertificate,
        company: req.body.company,
        position: req.body.position,
        workStartDate: req.body.workStartDate,
        workEndDate: req.body.workEndDate,
        inJob: req.body.inJob,
        workDescription: req.body.workDescription,
        reference: req.body.reference,
        typingSkill: req.body.typingSkill,
        codingSkill: req.body.codingSkill,
        softwareSkill: req.body.softwareSkill,
        name: req.body.name,
        level: req.body.level,
        lanCertificate: req.body.lanCertificate,
        belongTo: req.body.belongTo,
        step: req.body.step
      });
      req.body.id = req.session.progressingCV.id;
    }

    req.session.progressingCV = req.body;

    sails.log("[Session] ", req.session);
    if (req.wantsJSON) {
      return res.json({ message: "✔️ Successfully Saved ✔️", url: "/input" }); // for ajax request
    } else {
      return res.redirect("/input"); // for normal request
    }
  },

  //submit cv data
  submitData: async function (req, res) {
    if (req.method == "GET") return res.view("pages/users/inputData");

    if (!req.body.CV) return res.badRequest("Form-data not received.");

    req.body.CV.belongTo = req.session.userID;
    req.body.CV.step = "step2";

    if (req.session.progressingCV == null) {
      await CV.create(req.body.CV);
    } else {
      await CV.update(req.session.progressingCV.id).set({
        chiName: req.body.CV.chiName,
        engName: req.body.CV.engName,
        nickname: req.body.CV.nickname,
        sex: req.body.CV.sex,
        birth: req.body.CV.birth,
        countryCode: req.body.CV.countryCode,
        phone: req.body.CV.phone,
        email: req.body.CV.email,
        personWebLink: req.body.CV.personWebLink,
        address: req.body.CV.address,
        occupation: req.body.CV.occupation,
        jobArea: req.body.CV.jobArea,
        objective: req.body.CV.objective,
        profile: req.body.CV.profile,
        school: req.body.CV.school,
        eduStartDate: req.body.CV.eduStartDate,
        eduEndDate: req.body.CV.eduEndDate,
        major: req.body.CV.major,
        degree: req.body.CV.degree,
        mark: req.body.CV.mark,
        eduDescription: req.body.CV.eduDescription,
        eduCertificate: req.body.CV.eduCertificate,
        company: req.body.CV.company,
        position: req.body.CV.position,
        workStartDate: req.body.CV.workStartDate,
        workEndDate: req.body.CV.workEndDate,
        inJob: req.body.CV.inJob,
        workDescription: req.body.CV.workDescription,
        reference: req.body.CV.reference,
        typingSkill: req.body.CV.typingSkill,
        codingSkill: req.body.CV.codingSkill,
        softwareSkill: req.body.CV.softwareSkill,
        name: req.body.CV.name,
        level: req.body.CV.level,
        lanCertificate: req.body.CV.lanCertificate,
        belongTo: req.body.CV.belongTo,
        step: req.body.CV.step
      });
      req.body.CV.id = req.session.progressingCV.id;
    }

    req.session.progressingCV = req.body.CV;

    sails.log("[Session] ", req.session);
    return res.view("pages/users/step2");
  },

  //show template1
  showTemplate1: async function (req, res) {
    if (req.method == "GET") {
      var model = await CV.findOne(req.session.progressingCV.id);

      if (!model) return res.notFound();

      return res.view("pages/users/template1", { cv: model });
    }
  },

  //submit template (save in CVcode & CVdefaultCode)
  submitTemplate:  async function (req, res) {
    var model = await CV.update(req.session.progressingCV.id)
      .set({
        CVcode: req.body.CV,
        CVdefaultCode: req.body.CV,
      })
      .fetch();

    if (model.length == 0) return res.notFound();

    if (req.wantsJSON) {
      // sails.log("[Session] ", req.session);
      return res.json({ url: "/step3" });
    } else {
      return res.redirect("/step3");
    }
  },

  // show customize
  customize: async function (req, res) {
    if (req.method == "GET") {
      var model = await CV.findOne(req.session.progressingCV.id);

      if (!model) return res.notFound();

      req.session.reloadCV = "";
      req.session.reloadStatus = "false";

      return res.view("pages/users/customize", { cv: model });
    }
  },

  // save CV code (page: customize)
  saveCV: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.session.reloadCV = "";
    req.session.reloadStatus = "false";

    var model = await CV.update(req.session.progressingCV.id)
      .set({
        CVcode: req.body.CV,
      })
      .fetch();

    if (model.length == 0) return res.notFound();

    if (req.wantsJSON) {
      // sails.log("[Session] ", req.session);
      return res.json({
        message: "✔️ Successfully Saved ✔️",
        url: "/customize",
      });
    } else {
      return res.redirect("/customize");
    }
  },

  //submit cv code (page: customize)
  submitCVCode: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.session.reloadCV = "";
    req.session.reloadStatus = "false";

    var model = await CV.update(req.session.progressingCV.id)
      .set({
        CVcode: req.body.CV,
        CVdefaultCode: req.body.CV,
        step: req.body.step,
      })
      .fetch();

    if (model.length == 0) return res.notFound();

    if (req.wantsJSON) {
      // sails.log("[Session] ", req.session);
      return res.json({ url: "/" + req.body.step });
    } else {
      return res.redirect("/" + req.body.step);
    }
  },

  //pass the step (submit the default template code)
  passStep: async function (req, res) {
    if (req.method == "GET") return res.forbidden();

    req.session.reloadCV = "";
    req.session.reloadStatus = "false";

    var cv = await CV.findOne(req.session.progressingCV.id)

    if (cv.length == 0) return res.notFound();

    var model = await CV.update(req.session.progressingCV.id)
      .set({
        CVcode: cv.CVdefaultCode
      })
      .fetch();

    if (model.length == 0) return res.notFound();

    if (req.wantsJSON) {
      // sails.log("[Session] ", req.session);
      return res.json({ url: "/" + req.body.step });
    } else {
      return res.redirect("/" + req.body.step);
    }
  },

  // reloadCV
  reloadCV: async function (req, res) {
    req.session.reloadCV = req.body.CV;
    req.session.reloadStatus = req.body.status;
    //sails.log("[Session] ", req.session.reloadCV);
    return res.redirect("/customize");
  },
};
