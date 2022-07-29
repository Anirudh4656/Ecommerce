const mongoose = require("mongoose");
const db=process.env.DATABASE;
/*mongoose return promise*/
// mongoose.connect(db)
// .then(()=>{ console.log("connection succesfull")})
// .catch((err)=>console.log(err)); catch ko htaya kyoki vo error ko handle kr lega
mongoose.connect(db)
.then(()=>{ console.log("connection succesfull")})
