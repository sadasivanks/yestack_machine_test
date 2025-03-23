//code and file implemented by sadasivan.

//model schema start here
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({

  
    email: String,
    password: String,
    role:String,
    timestamp: { type: Date, default: Date.now },
})

const M_admin = mongoose.model('tb_admins', AdminSchema);
module.exports = M_admin;
//model schema end here.
