const path = require('path')


exports.deleteDoorImageController = async (req, res) => {
    try{
        return res.json({ success: true, status: 200, message: 'Call Recieved' })
    }catch(error){
        return res.json({ success: false, status: 400, message: 'Something went wrong'})
    }
    
}