const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.updateCustomerEmailController = async (req, res) => {
    try {
        const name_update = await prisma.user_info.upsert({
            where: {
                userUid_email: {
                    userUid: req.user.user_id,
                    email: req.body.email
                }
            },
            create: {
                userUid: req.user.user_id,
                email: req.body.email
            },
            update: {
                email: req.body.email
            }
        })

        return res.json({ success: true, status: 200, message: 'Email updated successfully' })
    } catch (error) {
        console.log('Update customer email controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}