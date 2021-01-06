/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {
  if ((await User.count()) == 0) {
    await User.createEach([
      {
        email: "susan@gmail.com",
        password: "123456",
        firstName: "Su San",
        lastName: "Chan",
        role: "user",
      },
      {
        email: "tony@gmail.com",
        password: "123456",
        firstName: "Tong Lee",
        lastName: "Wong",
        role: "user",
      },

      // etc.
    ]);
  }

  if ((await Admin.count()) == 0) {
    await Admin.createEach([
      { email: "admin@gmail.com", password: "123456", role: "admin" },
    ]);
  }

  if ((await CV.count()) == 0) {
    await CV.createEach([{ CVcode: "", CVlink: "123456", owner: "Su San Chan" }]);
  }

  const susanCV = await CV.findOne({ owner: "Su San Chan" });
  if ((await BasicInfo.count()) == 0) {
    await BasicInfo.createEach([
      {
        chiName: "陳素珊",
        engName: "Chan Su San",
        nickname: "Susan",
        sex: "Female",
        birth: "",
        countryCode: "852",
        phone: "12345678",
        email: "susan@gmail.com",
        personWebLink: "",
        address: "",
        occupation: "",
        jobArea: "",
        objective: "",
        profile: "",
        inside: susanCV.id
      },
    ]);
  }

  if ((await Education.count()) == 0) {
    await Education.createEach([
      {
        school: "Coding Unviersity",
        startDate: "",
        endDate: "",
        degree: "",
        description: "",
        certificate: "",
        inside: susanCV.id
      },
    ]);
  }

  const susan = await User.findOne({ email: "susan@gmail.com" });
  const susanBasic = await BasicInfo.findOne({ chiName: "陳素珊" });
  const susanEducation = await Education.findOne({ school: "Coding Unviersity" });

  await User.addToCollection(susan.id, "have").members(susanCV.id);
  await CV.addToCollection(susanCV.id, "include").members([
    susanBasic.id,
    susanEducation.id,
  ]);

  return;
};
