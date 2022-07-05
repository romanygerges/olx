const mongoose = require('mongoose')



const connectDB = ()=>{

return mongoose.connect(process.env.DBURL).then((result)=>{

console.log(`DBconnected........ ${process.env.DBURL}`);

}).catch(err => console.log('fail in connect DB'))

}

module.exports = connectDB