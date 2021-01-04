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

  return;
};
