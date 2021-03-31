/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  // "/": { view: "pages/homepage" },
  "/login": { view: "pages/login" },
  "/signup": { view: "pages/signup" },
  "/signup/result": { view: "pages/signupResult" },
  "/input": { view: "pages/users/inputData" },
  "/step2": { view: "pages/users/step2" },
  "/step3": { view: "pages/users/step3" },
  "/step4": { view: "pages/users/step4" },
  "/edit_image": { view: "pages/users/editImage" },
  "/merge_image": { view: "pages/users/mergeImage" },
  "/webcam_record": { view: "pages/users/webcamRecord" },
  "/webcam_capture": { view: "pages/users/webcamCapture" },
  "/chart": { view: "pages/users/chart" },
  "/finish": { view: "pages/users/finish" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
  "GET /user/:id/have": "UserController.populate",
  "GET /cv/:id/include": "CVController.populate",
  "GET /login": "PersonController.login",
  "POST /login": "PersonController.login",
  "POST /logout": "PersonController.logout",
  "POST /signup": "PersonController.signup",
  "GET /setting": "PersonController.setting",
  "POST /setting": "PersonController.setting",

  "GET /admin_main": "AdminController.main",
  "GET /user/info/:id": "AdminController.user_info",
  "POST /user_info": "AdminController.user_info",
  "DELETE /deleteUser/:id": "AdminController.deleteUser",

  "GET /main": "UserController.main",
  "GET /editCV/:id": "CVController.editCV",
  "DELETE /deleteCV/:id": "CVController.deleteCV",
  "GET /CV/:id": "CVController.publicatedCV",

  "POST /cv/saveData": "CVController.saveData",
  "POST /cv/submitData": "CVController.submitData",

  "GET /template1": "CVController.showTemplate1",
  "GET /template2": "CVController.showTemplate2",
  "GET /template3": "CVController.showTemplate3",
  "POST /cv/submitTemplate": "CVController.submitTemplate",

  "GET /customize": "CVController.customize",
  "GET /create": "CVController.create",

  "POST /cv/saveCV": "CVController.saveCV",
  "POST /cv/submitCVCode": "CVController.submitCVCode",
  "POST /cv/passStep": "CVController.passStep",
  "POST /cv/reloadCV": "CVController.reloadCV",
};
