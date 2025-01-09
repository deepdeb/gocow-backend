const readPool = require('../../config/mysql').readPool

exports.customerOtpVerify = async (data) => {
    try {
        let sql = "select customer_id from customer_list where otp = ? and phone_num = ?"
        const [resp] = await readPool.query(sql, [data.otp, data.customer_id]);

        if (resp.length > 0) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log('Customer login service error: ', error)
        return;
    }
}