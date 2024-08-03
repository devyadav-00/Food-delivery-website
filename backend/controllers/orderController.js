import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Razorpay from 'razorpay'

const key_id = process.env.KEY_ID;
const key_secret = process.env.KEY_SECRET;

const razorpay = new Razorpay({
    key_id: key_id,
    key_secret: key_secret
  });

//placing user order from frontend
const placeOrder = async (req,res) => {
   try {

    const userId = req.body.userId

    var options = {
        amount : req.body.amount *100*80,
        currency : "INR",
        receipt : `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options);


    res.json({
        success: true,
        order: {
           id: order.id,
           amount : order.amount,
           currency : order.currency,
           receipt : order.receipt
        },
        userId,
        payStatus : "created"
        
    });

   } catch (error) {
        console.log(error);
        res.json({
           success : false,
           message : "Error"
        })
   }
}

//verifying order
const verifyOrder = async (req,res) => {
    const {orderId, paymentId,signature,amount,orderItem,userAddress,userId} = req.body;

    const orderConfirm = new orderModel({
        orderId, paymentId,signature,amount,orderItem,userAddress,userId,payStatus : "Paid"
    })
    await orderConfirm.save()
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

    res.json({
        success : true,
        message : "payment successfull",
        orderConfirm
    })
}

//user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({
            success : true,
            data : orders
        })
    } catch (error) {
        console.log(error);
        res.json({
           success : false,
           message : "Error"
        })
    }
}

//listing orders for admin panel
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({
            success : true,
            data : orders
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
}

//api for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({
            success : true,
            message : "Status Updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error"
        })
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}