const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()



const socketUserMap = new Map();
const userSocketMap = new Map();

async function execute(io){
    io.on('connection', (socket) => {
        console.log('a user connected' , socket.id);
        
        socket.on('setSocketId', async (msg) => {
          console.log('setSocket id' , msg.name, "====>"  , socket.id );
          socketUserMap.set(socket.id,msg.name)
          userSocketMap.set(msg.name,socket.id)
          console.log("socketTousermap")
          console.log(socketUserMap)
          console.log("userTosocketmap")
          console.log(userSocketMap)
         
        });
        socket.on('disconnect', async () => {
          console.log('user disconnected with soc id: '+socket.id);
        });
        
        socket.on('locationData', async (receivedData) => {
          console.log(receivedData)
          receiverId=userSocketMap.get("1")
          io.to(receiverId).emit('my broadcast' , {sender:receivedData.sender,lat:receivedData.latlng.lat,lng:receivedData.latlng.lng, heading:receivedData.heading});
        });
      });       
}

module.exports = { execute }