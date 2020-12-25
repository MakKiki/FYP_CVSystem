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
  sails.bcrypt = require("bcryptjs");
  const saltRounds = 10;
  const hash = await sails.bcrypt.hash("123456", saltRounds);

  if ((await Person.count()) == 0) {
    await Person.createEach([
      {
        email: "susan@gmail.com",
        password: hash,
        firstName: "Chan",
        lastName: "Su San",
        role: "user",
      },
      {
        email: "tony@gmail.com",
        password: hash,
        firstName: "Wong",
        lastName: "Tong Lee",
        role: "user",
      },
      { email: "admin@gmail.com", password: hash, role: "admin" },
      // etc.
    ]);
  }

  return;
};
