const SettingsAccountService = require('../services/settings-account.service')

class SettingsAccountController {
    async createSettingsAccountPage(req, res, next) {
        try {
            const data = await SettingsAccountService.createSettingsAccountPage()

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }

    async getSettingsAccount(req, res, next) {
        try {
            const data = await SettingsAccountService.getSettingsAccount()

            return res.json(data)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new SettingsAccountController()