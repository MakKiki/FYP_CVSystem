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

  const susan = await User.findOne({ email: "susan@gmail.com" });
  const susanCV = await CV.findOne({ owner: "Su San Chan" });

  await User.addToCollection(susan.id, "have").members(susanCV.id);

  return;
};
