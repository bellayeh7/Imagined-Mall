// routes/eventTag.js
const router = require("koa-router")();
const { commodity } = require("../models/EventTag");

router.prefix("/api/commodity");


/**
 * 查商品详情
 * @param  {Number} commodityId required
 * @return {Object} result
 */
router.get("/detail", async (ctx) => {
  await commodity
    .findOne({ openid: ctx.query.commodityId })
    .then((res) => {
      ctx.body = { code: 0, result: res };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "请求出错" };
    });
});

/**
 * 查所有用户
 * @param  {String} options.openid [微信小程序openid] required
 * @return {Object} result
 */
router.get("/findAllUser", async (ctx) => {
  await commodity
    .find({ openid: ctx.query.openid })
    .then((res) => {
      if (res) {
        ctx.body = { code: 0, result: res };
      } else {
        ctx.body = { code: 1, message: "查询为空" };
      }
    })
    .catch(() => {
      ctx.body = { code: -1, message: "请求出错" };
    });
});

/**
 * 增加用户
 * @param  {String} appid required
 * @param  {String} openid required
 * @param  {String} nickName required
 * @param  {Boolean} isInsider required
 * @param  {String} loginTime required
 * @return {Object} result
 */
router.post("/addUser", async (ctx) => {
  let { appid, openid, avatarUrl, nickName, isInsider, loginTime } =
    ctx.request.body;
  
  await commodity
    .create({
      appid,
      openid,
      avatarUrl,
      nickName,
      isInsider,
      loginTime,
    })
    .then((res) => {
      if (res) {
        ctx.body = { code: 0, result: res };
      } else {
        ctx.body = { code: -1, message: "添加失败" };
      }
    })
    .catch(() => {
      ctx.body = { code: -1, message: "添加异常" };
    });
});

/**
 * 单个删除用户
 * @param  {String} openid required
 * @return {Object} result
 */
router.post("/deleteUser", async (ctx) => {
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
 * 批量删除用户
 * @param  {Array} openid required
 * @return {Object} result
 */
router.post("/batchDeleteUser", async (ctx) => {
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
 * 更改用户信息
 * @param  {String} openid required
 * @param  {String} avatarUrl unrequired
 * @param  {String} nickName unrequired
 * @param  {Boolean} isInsider unrequired
 * @param  {Boolean} appid unrequired
 * @param  {Boolean} loginTime unrequired
 * @return {Object} result
 */
router.post("/updateUser", async (ctx) => {
  const {openid, ...changeData} = ctx.request.body;
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

