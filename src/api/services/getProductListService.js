const readPool = require('../../config/mysql').readPool;

exports.getProductList = async () => {
    try {
        let sql = "select pl.product_id, pl.product_name, pl.catch_phrase, pl.product_image, pl.product_description, pl.price, pl.availability, pl.unit, pl.package, o.offer_type, o.offer_amount, pl.price - (pl.price * (o.offer_amount / 100)) as final_price, (pl.price * (o.offer_amount / 100)) as difference from product_list as pl left join offers as o on o.product_id = pl.product_id where pl.is_deleted = 0 and o.is_active = 1"

        const [resp] = await readPool.query(sql);

        return resp;

    } catch (error) {
        console.log('Get product list service error: ', error)
        return;
    }
}