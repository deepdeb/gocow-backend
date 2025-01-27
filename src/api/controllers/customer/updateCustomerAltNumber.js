const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateCustomerAltNumController = async (req, res) => {
    try {
        const name_update = await prisma.user_info.update({
            where: {
                userUid: req.user.user_id
            },
            data: {
                alternate_number: req.body.alternate_number
            }
        })

        return res.json({ success: true, status: 200, message: 'Alternate number updated successfully' })
    } catch (error) {
        console.log('Update customer alternate number controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}