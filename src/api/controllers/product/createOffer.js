const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createOfferController = async (req, res) => {
    try {
        
    } catch (error) {
        console.log('Create offer controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}