import mongoose from 'mongoose'


export function connectDb() {
  return mongoose.connect('mongodb+srv://esinyilmazbilek:Greenjasmine_3@cluster0.yxh5u.mongodb.net/brands-db?retryWrites=true&w=majority', 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true }
  )
}

export function truncateDb() {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection

    const promises = Object.keys(collections).map(collection => {
      return mongoose.connection.collection(collection).deleteMany({})
    })
    return Promise.all(promises)
  }
}

export function disconnectDb() {
  if (mongoose.connection.readyState !== 0) {
    return mongoose.disconnect()
  }
}