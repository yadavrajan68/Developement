const ensureAuthenticated = require("../Middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuthenticated,(req, res) => {
    console.log('..........logged in user detail ...', req.user);
    res.status(200).json([
      {
        name: "mobile",
        price: 1000
      },
      {
        name: "tv",
        price: 3000
      }
    ]);
});

module.exports = router;
