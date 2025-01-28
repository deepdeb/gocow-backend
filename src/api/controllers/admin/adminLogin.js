const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authHelpers = require('../../utils/authHelpers');

exports.adminLoginController = async (req, res) => {
    try {
        console.log('>>>>',req.body)
        let admin_check = await prisma.admin.findUnique({
            where: {
                email: req.body.userName
            }
        })
        console.log(admin_check);
        if(admin_check != null){

            const access_token = await authHelpers.generateAccessToken(admin_check)

            if(admin_check.status && admin_check.password === req.body.password) {
                return res.json({ success: true, status: 200, message: "Login successful", response: {"id": admin_check.admin_id, "first_name": admin_check.first_name, "last_name": admin_check.last_name, "admin_type": admin_check.privilege, "access_token": access_token }})
            } else {
                return res.json({ success: true, status: 420, message: "Incorrect credential"})
            }
        } else {
            return res.json({ success: true, status: 420, message: "Incorrect credential"})
        }
    } catch (error) {
        console.log('Admin login controller error: ', error);
        return res.json({ success: false, status: 400, message: error})
    }
}