const readPool = require('../../config/mysql').readPool
const writePool = require('../../config/mysql').writePool

exports.customerLogin = async (data) => {
    try {
        let sql = "select customer_id, otp from customer_list where phone_num = ?"
        const [resp] = await readPool.query(sql, [data.phone_num]);

        if (resp.length > 0) {
            return [resp[0].customer_id]
        } else {
            let create_customer_sql = "insert into customer_list (phone_num, otp) values (?,?)"
            const [create_customer_resp] = await writePool.query(create_customer_sql, [data.phone_num, 123456])
            return [create_customer_resp.insertId]
        }
    } catch (error) {
        console.log('Customer login service error: ', error)
        return;
    }
}