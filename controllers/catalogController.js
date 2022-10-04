const { getAll, getById } = require("../services/roomService");

const router = require("express").Router();

router.get("/", async (req, res) => {
  const search = req.query.search || "";
  const fromPrice = Number(req.query.fromPrice) || 1;
  const toPrice = Number(req.query.toPrice) || 1000;
  const city = req.query.city || "";

  const rooms = await getAll(search, city, fromPrice, toPrice);
  res.render("catalog", {
    title: "All Accomodation",
    rooms,
    search,
    city,
    fromPrice,
    toPrice,
  });
});
router.get("/:id", async (req, res) => {
  const roomId = req.params.id;
  const room = await getById(roomId);
  console.log(room.facilities);

  if (room) {
    res.render("details", {
      title: "Accomodation Details",
      room,
    });
  } else {
    res.render("roomNotFound", {
      title: "Accomodation Details",
      roomId,
    });
  }
  res.render("details", {
    title: "Accomodation Details",
  });
});

module.exports = router;
