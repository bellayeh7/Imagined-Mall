// routes/eventTag.js
const router = require("koa-router")();
const { commodity } = require("../models/EventTag");

router.prefix("/api/commodity");

/**
 * 查询商品详情
 * @param  {Number} commodityId required
 * @return {Object} result
 */
router.get("/detail", async (ctx) => {
  await commodity
    .findOne({ commodityId: ctx.query.commodityId })
    .then((res) => {
      ctx.body = { code: 0, result: res };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "请求出错" };
    });
});

/**
 * 分页查询所有商品
 * @param  {String} search [查询商品名称]
 * @param  {Number} pageNum [当前页数]
 * @param  {Number} pageSize [每页数量]
 * @return {Object} result
 * find( { $text: { $search: "java coffee shop" } } )
 */
router.get("/findAll", async (ctx) => {
  const { search, pageNum, pageSize } = ctx.query;
  const total = await commodity
    .find({ name: new RegExp(search, "g") })
    .count()
    .catch((err) => {
      ctx.body = { code: -1, message: "请求出错" + err };
      return;
    });
  let skip = (pageNum - 1) * pageSize;
  skip = skip > 0 && skip <= total ? skip : 0;
  const limit = pageSize > 0  && skip + pageSize <= total ? pageSize : total - skip;
  await commodity
    .find(
      { name: new RegExp(search, "g") },
      {
        _id: 0,
        commodityId: 1,
        classification: 1,
        commodityId: 1,
        type: 1,
        name: 1,
        mainPath: 1,
        price: 1,
        quantity: 1,
      }
    )
    .skip(skip)
    .limit(limit)
    .then((res) => {
      if (res) {
        ctx.body = { code: 0, result: res, pageNum, pageSize, total };
      } else {
        ctx.body = { code: 1, message: "查询为空" };
      }
    })
    .catch((err) => {
      ctx.body = { code: -1, message: "请求出错" + err };
    });
});

/**
 * 增加商品
 * @param  {String} appid required
 * @param  {String} openid required
 * @param  {String} nickName required
 * @param  {Boolean} isInsider required
 * @param  {String} loginTime required
 * @return {Object} result
 */
router.post("/add", async (ctx) => {
  // let { appid, openid, avatarUrl, nickName, isInsider, loginTime } = ctx.request.body;
  const data = commodity.findAndModify({
    update: { $inc: { commodityId: 1 } },
    // query: {},
    new: true,
  });
  console.log("data", data);
  // { "_id" : ObjectId("4c637dbd900f00000000686c"), "name" : "user", "id" : 1 }
  // await commodity
  //   .create({
  //     // appid,
  //     // openid,
  //     // avatarUrl,
  //     // nickName,
  //     // isInsider,
  //     // loginTime,
  //   })
  //   .then((res) => {
  //     if (res) {
  //       ctx.body = { code: 0, result: res };
  //     } else {
  //       ctx.body = { code: -1, message: "添加失败" };
  //     }
  //   })
  //   .catch(() => {
  //     ctx.body = { code: -1, message: "添加异常" };
  //   });
});

/**
 * 单个删除商品
 * @param  {String} openid required
 * @return {Object} result
 */
router.post("/delete", async (ctx) => {
  let { openid } = ctx.request.body;
  await commodity
    .deleteOne({ openid })
    .then((res) => {
      ctx.body = { code: 0, result: res };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "删除异常" };
    });
});

/**
 * 批量删除商品
 * @param  {Array} openid required
 * @return {Object} result
 */
router.post("/batchDelete", async (ctx) => {
  let { openid } = ctx.request.body;
  await commodity
    .deleteMany({ openid: { $in: openid } })
    .then((res) => {
      ctx.body = { code: 0, result: res };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "删除异常" };
    });
});

/**
 * 更改商品信息
 * @param  {String} openid required
 * @param  {String} avatarUrl unrequired
 * @param  {String} nickName unrequired
 * @param  {Boolean} isInsider unrequired
 * @param  {Boolean} appid unrequired
 * @param  {Boolean} loginTime unrequired
 * @return {Object} result
 */
router.post("/update", async (ctx) => {
  const { openid, ...changeData } = ctx.request.body;
  await commodity
    .updateOne(
      { openid: openid }, // 查找条件
      changeData // 修改后的值
    )
    .then((res) => {
      ctx.body = { code: 0, result: res };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "修改异常" };
    });
});

module.exports = router;
