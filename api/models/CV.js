/**
 * CV.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    //finalize CV
    CVcode: {
      type: "string",
    },

    //for pass step
    CVdefaultCode: {
      type: "string",
    },

    CVlink: {
      type: "string",
    },

    template: {
      type: "string",
    },

    step: {
      type: "string",
    },

    //baiscInfo
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
      type: "string",
    },

    phone: {
      type: "string",
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

    //education
    school: {
      type: "json",
      columnType: "array",
    },

    eduStartDate: {
      type: "json",
      columnType: "array",
    },

    eduEndDate: {
      type: "json",
      columnType: "array",
    },

    degree: {
      type: "json",
      columnType: "array",
    },

    major: {
      type: "json",
      columnType: "array",
    },

    mark: {
      type: "json",
      columnType: "array",
    },

    eduDescription: {
      type: "json",
      columnType: "array",
    },

    eduCertificate: {
      type: "json",
      columnType: "array",
    },

    //work
    company: {
      type: "json",
      columnType: "array",
    },

    position: {
      type: "json",
      columnType: "array",
    },

    workStartDate: {
      type: "json",
      columnType: "array",
    },

    workEndDate: {
      type: "json",
      columnType: "array",
    },

    inJob: {
      type: "json",
      columnType: "array",
    },

    workDescription: {
      type: "json",
      columnType: "array",
    },

    reference: {
      type: "json",
      columnType: "array",
    },

    //skill
    typingSkill: {
      type: "string",
    },

    codingSkill: {
      type: "string",
    },

    softwareSkill: {
      type: "string",
    },

    //language
    name: {
      type: "json",
      columnType: "array",
    },

    level: {
      type: "json",
      columnType: "array",
    },

    lanCertificate: {
      type: "json",
      columnType: "array",
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    belongTo: {
      model: "User",
    },
  },
};
