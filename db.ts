import mongoose from "mongoose"
let dbUri:string = 'mongodb://db/lyts'
mongoose.connect(
  dbUri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
).then((v)=> {
  console.log("DB CONNECT")
}).catch(err=> {
  console.log("DB ERROR")
})

export default mongoose
