const readPool = require('../../config/mysql').readPool;

exports.getProductList = async () => {
    try {
        let sql = "select product_id, product_name, catch_phrase, product_description, price, availability, unit, package from product_list where is_deleted = 0"

        const [resp] = await readPool.query(sql);

        return resp;

    } catch (error) {
        console.log('Get product list service error: ', error)
        return;
    }
}