// models/eventTag.js
const mongoose = require("mongoose");

// 用户
const memberSchema = new mongoose.Schema(
  {
    appid: String,
    openid: String,
    avatarUrl: String,
    nickName: String,
    loginTime: String,
    isInsider: Boolean,
  },
  { collection: "member" }
);
// 用户收货地址
const addressSchema = new mongoose.Schema(
  {
    addressId: Number,
    openid: String,
    address: String,
    province: String,
    city: String,
    district: String,
    detail: String,
    mobile: String,
  },
  {
    collection: "member-address",
  }
);
// 商品
const commoditySchema = new mongoose.Schema(
  {
    commodityId: Number,
    type: Number,
    name: String,
    classification: String,
    mainPath: String,
    otherPath: Array,
    material: String,
    occasion: Array,
    price: Number,
    inventory: Number,
    quantity: Number,
    specification: Array,
  },
  {
    collection: "commodity",
  }
);
// 订单
const orderSchema = new mongoose.Schema(
  {
    tradeNo: String,
    openid: String,
    name: String,
    address: String,
    mobile: String,
    orderTime: String,
    total: Number,
    payStatus: Number,
    status: Number,
  },
  { collection: "order" }
);
// 订单商品
const orderCommoditySchema = new mongoose.Schema(
  {
    tradeNo: String,
    commodityId: Number,
    commodityName: String,
    specification: String,
    price: Number,
    amount: Number,
  },
  { collection: "order-commodity" }
);
// 客服聊天
const chatImSchema = new mongoose.Schema(
  {
    openid: String,
    chatId: Number,
    avatar: String,
    nickName: String,
    sendTime: String,
    status: Number,
    isRead: Number,
    type: String,
    content: String,
  },
  { collection: "chat-im" }
);
// 用户聊天
const chatClientSchema = new mongoose.Schema(
  {
    openid: String,
    chatId: Number,
    avatar: String,
    nickName: String,
    sendTime: String,
    status: Number,
    isRead: Number,
    type: String,
    content: String,
  },
  { collection: "chat-client" }
);
module.exports = {
  member: mongoose.model("member", memberSchema),
  address: mongoose.model("member-address", addressSchema),
  commodity: mongoose.model("commodity", commoditySchema),
  order: mongoose.model("order", orderSchema),
  orderCommodity: mongoose.model("order-commodity", orderCommoditySchema),
  chatIm: mongoose.model("chat-im", chatImSchema),
  chatClient: mongoose.model("chat-client", chatClientSchema),
};
