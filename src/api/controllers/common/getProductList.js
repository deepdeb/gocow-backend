const Joi = require('joi');
const getProductListService = require('../../services/getProductListService')
exports.getProductListController = async (req, res) => {
    try {
        const resp = await getProductListService.getProductList();
        if (resp) {
            return res.json({ success: true, status: 200, response: resp })
        } else {
            return res.json({ success: false, status: 500, message: 'Internal server error', response: [] })
        }
    } catch (error) {
        console.log('Get product list controller error: ', error);
        return res.json({ success: false, status: 400, message: res.message, response: []})
    }
}