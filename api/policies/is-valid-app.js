/**
 * is-valid-app
 *
 * A simple policy that allows any request with a valid token
 *
 */
 module.exports = async function (req, res, proceed) {
    var error = [];

    if (req.body && req.body.auth && req.body.auth.app_token) {
        if(sails.config.appsettings.valid_app_token.indexOf(req.body.auth.app_token) > -1) {
            return proceed();
        }
    }

    error.push(await sails.helpers.utility.error.getAppError("general.forbidden_error"));
    return res.jsonError(error);
};