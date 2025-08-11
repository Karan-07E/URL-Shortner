import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    originalUrl : {
        type : String,
        required : true,
        index : true
    },
    shortId : {
        type : String,
        required : true,
        unique : true,
        index : true
    }
}, { timestamps : true });

const Url = mongoose.model("Url", UrlSchema);

export default Url;