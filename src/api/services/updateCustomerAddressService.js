const writePool = require('../../config/mysql').writePool;

exports.updateCustomerAddress = async (data) => {
    try {
        let sql = "update customer_list set customer_name = ?, flat_house_apartment = ?, locality_area_landmark = ? where customer_id = ?"

        const [resp] = await writePool.query(sql, [data.customer_name, data.flat_house_apartment, data.locality_area_landmark, data.customer_id]);

        return resp;

    } catch (error) {
        console.log('Update customer address service error: ', error)
        return;
    }
}