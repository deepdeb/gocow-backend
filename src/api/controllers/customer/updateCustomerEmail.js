const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateCustomerEmailController = async (req, res) => {
    try {
        const name_update = await prisma.user_info.update({
            where: {
                userUid: req.user.user_id
            },
            data: {
                email: req.body.email
            }
        })

        return res.json({ success: true, status: 200, message: 'Email updated successfully' })
    } catch (error) {
        console.log('Update customer email controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}