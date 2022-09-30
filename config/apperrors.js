module.exports.apperrors = {
    general: {
        unknown_error: {
            code: 5100,
            message: "An error occurred, please refresh and try again"
        },
        invalid_parameters: {
            code: 5101,
            message: "Invalid parameters"
        },
        forbidden_error: {
            code: 5102,
            message: "Invalid app token"
        },
    },
    record: {
        create_error: {
            code: 5201,
            message: "Could not create record"
        },
        list_error: {
            code: 5202,
            message: "Could not retrieve list of records"
        },
        update_error: {
            code: 5203,
            message: "Could not update record"
        },
        delete_error: {
            code: 5204,
            message: "Could not delete record"
        }
    },
    email: {
        send_email_error: {
            code: 5300,
            message: "Could not send email"
        }
    },
    user: {
        invalid_login_username: {
            code: 5400,
            message: "Invalid Username"
        },
        invalid_login_password: {
            code: 5401,
            message: "Invalid Password, Try Again"
        },
        not_active_user: {
            code: 5402,
            message: "Deactived Account. Contact Admin"
        },
        no_access: {
            code: 5403,
            message: "Access Denied. Try Login Again"
        }
    }
}