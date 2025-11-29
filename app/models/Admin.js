import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    username: {type: String},
    password:{type:String},
    keyId:{type:String}
},
{timestamps: true});

export default mongoose.models.Admin || mongoose.model("Admin",AdminSchema);
