module.exports = function jsonOk(params) {
    if (params) {
        if (!params.success_message) {
            params.success_message = "Success";
        }

        if (params.data) {
            this.res.json({
                success: true,
                success_message: params.success_message,
                data: params.data
            });
        } else {
            if(isNaN(params.data)) {
                this.res.json({
                    success: true,
                    success_message: params.success_message
                });
            } else {
                this.res.json({
                    success: true,
                    success_message: params.success_message,
                    data: params.data
                });
            }
        }
    } else {
        this.res.json({
            success: true
        });
    }
}