const { createFacility, getAllFacilities, addFacilities } = require("../services/facilityService");
const { getById } = require("../services/roomService");

const facilityController = require("express").Router();

facilityController.get("/create", async (req, res) => {
  //show creation form
  res.render("createFacility", {
    title: "Create new facility",
  });
});

facilityController.post("/create", async (req, res) => {
  //   console.log(req. body);
  try {
    await createFacility(req.body.label, req.body.iconUrl);
    res.redirect("/catalog");
  } catch (err) {
    console.log(err);
    //TODO render errors
    res.render("createFacility", {
      title: "Create New Facility",
    });
  }
  //take data from body
  //create model instance
  //profit
});

facilityController.get('/:roomId/decorateRoom',async(req,res)=>{
  const roomId=req.params.roomId;
  const room=await getById(roomId);
  const facilities=await getAllFacilities();


  res.render('decorate',{
    title: 'Add Facility',
    room,
    facilities
  });
})

facilityController.post('/:roomId/decorateRoom',async (req,res)=>{
  await addFacilities(req.params.roomId,Object.keys(req.body))


  res.redirect('/facility/'+req.params.roomId+"/decorateRoom")
})


module.exports = facilityController;
