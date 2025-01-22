const path = require('path')
const fs = require('fs')


exports.deleteDoorImageController = async (req, res) => {
    try{
        const fileName = req.user.user_id +"_door"+ '.' + 'jpg'
        const filePath = path.join(__dirname, "../../../../public/customer_door/");
        console.log(filePath+fileName)
        fs.unlinkSync(filePath+fileName)
        
        return res.json({ success: true, status: 200, message: 'Call Recieved' })
    }catch(error){
        return res.json({ success: false, status: 400, message: error})
    }
    
}