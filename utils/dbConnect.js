import mongoose from 'mongoose'

const connection = {};

async function dbConnect() {
    console.log('Connecting...')
    if (connection.isConnected) {
        console.log('MongoDB is already connected')
        return;
    }
    const db = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })


    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected)
    if (!connection.isConnected) {
        throw new Error('Error connecting to MongoDB')
    }
    console.log('MongoDB is connected')

}

export default dbConnect;