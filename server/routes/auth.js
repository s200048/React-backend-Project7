const router = require("express").Router();

router.use((req, res, next) => {
  console.log("A request is coming in to auth.js");
  next();
});

// 用postman 同server connect ， testAPI 係用嚟睇同server 有冇連埋一齊
router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working.",
  };
  return res.json(msgObj);
});

module.exports = router;
