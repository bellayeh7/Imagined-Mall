// routes/eventTag.js
const router = require("koa-router")();
const { member, orderCommodity } = require("../models/EventTag");

router.prefix("/api/chat");

// 查所有
// 查订单商品
router.get("/findAll", async (ctx) => {
  const res = await orderCommodity.find({});
  ctx.body = {
    code: 0,
    result: res,
  };
});

// 查所有用户
router.get("/findUser", async (ctx) => {
  const res = await member.find({});
  ctx.body = {
    code: 0,
    result: res,
  };
});

// 增加
router.post("/add", async (ctx) => {
  let { icon, label, labelEn, value } = ctx.request.body;
  await EventTag.create({ icon, label, labelEn, value })
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

// 删除[单个]
router.post("/delete", async (ctx) => {
  let { uuid } = ctx.request.body;
  await EventTag.deleteOne({ uuid })
    .then(() => {
      ctx.body = { code: 0 };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "删除异常" };
    });
});

// 删除[批量]
router.post("/batchDelete", async (ctx) => {
  let { uuids } = ctx.request.body;
  await EventTag.deleteMany({ uuid: { $in: uuids } })
    .then(() => {
      ctx.body = { code: 0 };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "删除异常" };
    });
});

// 改
router.post("/update", async (ctx) => {
  let { icon, uuid, label, labelEn, value } = ctx.request.body;
  await EventTag.updateOne(
    { uuid }, // 查找条件
    { icon, label, labelEn, value } // 修改后的值
  )
    .then((res) => {
      ctx.body = { code: 0, result: res };
    })
    .catch(() => {
      ctx.body = { code: -1, message: "修改异常" };
    });
});

// 查单个
router.get("/detail", async (ctx) => {
  EventTag.findOne({})
    .then((res) => {
      if (res) {
        ctx.body = { code: 0, result: res };
      } else {
        ctx.body = { code: 1, message: "查询为空" };
      }
    })
    .catch(() => {
      ctx.body = { code: -1, message: "查询异常" };
    });
});

module.exports = router;
