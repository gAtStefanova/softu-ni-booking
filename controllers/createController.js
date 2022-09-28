const { create } = require("../services/accomodationService");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("create", {
    title: "Host New Accomodation",
  });
});

router.post("/", async (req, res) => {
  
    try {
    const result = await create(req.body);
    console.log(result);
        res.redirect("/catalog/" + result.id);
  } catch (error) {
        res.render("create", {
      title: "Request Error",
    });
  }
});
module.exports = router;
