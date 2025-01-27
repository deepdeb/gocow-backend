const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateCustomerNameController = async (req, res) => {
    try {
        const name_update = await prisma.customer.update({
            data: {
                customer_name: req.body.customer_name
            },
            where: {
                userUid: req.user.user_id
            }
        })

        return res.json({ success: true, status: 200, message: 'Name updated successfully' })
    } catch (error) {
        console.log('Update customer name controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}