const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');
const path = require('path')

exports.adminAddActiveArea = async (req, res) => {
    try {

        let data = req.body;

        console.log('data>>>', data)

        let existingPincode = await prisma.active_area.findUnique({
            where: {
                pincode: req.body.pincode
            }
        })

        console.log('existing pincode>>>', existingPincode);

        if (existingPincode) {
            return res.json({ success: true, status: 200, message: "Pincode already exists" })
        }

        let addActiveArea = await prisma.active_area.create({
            data: {
                locality_name: req.body.locality_name,
                pincode: req.body.pincode,
                added_by: req.admin.id
            }
        })
        return res.json({ success: true, status: 200, message: "Area added successfully" })
    } catch (error) {
        console.log('Add active area controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.getActiveArea = async (req, res) => {
    try {
        let activeAreas = await prisma.active_area.findMany({
            include: {
                admin: true
            },
            orderBy: {
                active_area_id: 'desc'
            }
        })
        return res.json({ success: true, status: 200, data: activeAreas })
    } catch (error) {
        console.log('Admin get active area controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.toggleActiveArea = async (req, res) => {
    try {
        console.log(req.body)
        let activeAreas = await prisma.active_area.update({
            where: {
                active_area_id: req.body.item_id
            }, data: {
                active: req.body.newStatus
            }
        })
        return res.json({ success: true, status: 200, message: "Area active status changed successfully" })
    } catch (error) {
        console.log('Admin get active area controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.updateLocality = async (req, res) => {
    try {
        // console.log('req body>>>>', req.body)

        let updateLocality = await prisma.active_area.update({
            where: {
                active_area_id: req.body.area_id,
            },
            data: {
                locality_name: req.body.locality_name,
                pincode: req.body.pincode.toString()
            }
        })

        return res.json({ success: true, status: 200, message: 'area updated successfully' })
    } catch (error) {
        console.log('Admin update active area controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}

exports.searchLocality = async (req, res) => {
    try {
        // console.log('locality req body>>>', req.body)
        // console.log('locality search term>>>', req.body.search_term);
        // console.log('locality start date>>>', req.body.from_date);
        // console.log('locality end date>>>', req.body.to_date);

        let whereCondition = {
            OR: [
                {
                    locality_name: {
                        contains: req.body.search_term
                    }
                },
                {
                    pincode: {
                        contains: req.body.search_term
                    }
                }
            ]
        }

        if (req.body.to_date && req.body.from_date) {
            whereCondition.AND = [
                {
                    createdAt: {
                        lte: new Date(req.body.to_date).toISOString(),
                        gte: new Date(req.body.from_date).toISOString()
                    }
                }
            ]
        }

        let locality_list = await prisma.active_area.findMany({
            include: {
                admin: true
            },
            orderBy: {
                active_area_id: 'desc'
            },
            where: whereCondition
        })

        return res.json({ success: true, status: 200, localityList: locality_list })
    } catch (error) {
        console.log('Search locality controller error: ', error);
        return res.json({ success: false, status: 400, message: error })
    }
}