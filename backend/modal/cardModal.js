import mongoose from "mongoose";

const CardModalSchema = new mongoose.Schema({
    user:{
        type :mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        require:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                require:false
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    
},
{
    timestamps:true
}
)

export default mongoose.model("Cart",CardModalSchema);