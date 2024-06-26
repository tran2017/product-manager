const express = require("express");
const authCheck = require("../middlewares/check-auth");
const { check } = require("express-validator");
const settingsController = require("../controllers/settings-controller");
const router = express.Router();

router.get("/login-template/selected-template", settingsController.getSelectedTemplate);
// router.use(authCheck);
router.post("/", [check("timezone").notEmpty()], settingsController.saveGeneralSettings);
router.get("/general-settings", settingsController.loadInitialData);

router.post("/letter/encrypt-all", [check("words").notEmpty()], settingsController.encryptAll);
router.post("/letter/encrypt-sensitive", [check("words").notEmpty()], settingsController.encryptSensitiveWords);

router.post("/blacklist/check-email", [check("emails").notEmpty().isLength({ min: 1 })], settingsController.checkEmailsBlacklist);

router.post("/phone-number/extrac-data", [check("numbers").notEmpty().isLength({ min: 1 })], settingsController.getPhoneInfo); 

router.post("/blacklist/check-ip", [check("ips").notEmpty().isLength({ min: 1 })], settingsController.checkIpsBlacklist);

router.post("/mails/fetch-mails", [check("mails").notEmpty().isLength({ min: 1 })], settingsController.fetchOfficeLeads);

router.post("/mails/remove-spam", [check("mails").notEmpty().isLength({ min: 1 })], settingsController.RemoveSpamMails);

router.post("/mails/filter-company-mails", [check("mails").notEmpty().isLength({ min: 1 })], settingsController.CompanyEmailFilter);

router.post("/mails/sort-email-provider", [check("mails").notEmpty().isLength({ min: 1 })], settingsController.SortEmailProvider);

router.post("/address/detector", [check("address").notEmpty().isLength({ min: 1 })], settingsController.AddressDetector);
module.exports = router;