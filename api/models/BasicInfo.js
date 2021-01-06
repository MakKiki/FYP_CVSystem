/**
 * BasicInfo.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    chiName: {
      type: "string",
    },

    engName: {
      type: "string",
    },

    nickname: {
      type: "string",
    },

    sex: {
      type: "string",
    },

    birth: {
      type: "string",
    },

    countryCode: {
      type: "number",
    },

    phone: {
      type: "number",
    },

    email: {
      type: "string",
    },

    personWebLink: {
      type: "string",
    },

    address: {
      type: "string",
    },

    occupation: {
      type: "string",
    },

    jobArea: {
      type: "string",
    },

    objective: {
      type: "string",
    },

    profile: {
      type: "string",
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    inside: {
      model: "CV",
    },
  },
};
