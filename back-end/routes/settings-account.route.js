const Router = require('express').Router
const SettingsAccountController = require('../controllers/settings-account.controller')


const router = new Router()

router.post('/settings-account', SettingsAccountController.createSettingsAccountPage)
router.get('/settings-account', SettingsAccountController.getSettingsAccount)

module.exports = router