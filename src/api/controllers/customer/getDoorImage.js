const path = require('path')

exports.getDoorImageController = async (req, res) => {
    try{
        console.log("get image called")
        console.log(req.user)
        const imageName= req.user.user_id+"_door"+ '.' + 'jpg'
        console.log(imageName)
        const imagePath = path.join(__dirname, "../../../../customer_uploaded_files", imageName);

        res.sendFile(imagePath, (err) => {
            if (err) {
              console.error('Error sending file:', err);
              res.status(404).json({ error: 'Image not found' });
            }else(
              console.log("sent image")
            )
          });

    }catch(error){
        return res.json({ success: false, status: 400, message: error})
    }
    
}