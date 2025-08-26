const express = require("express");
const {handleAllGetUsers,GetUserById,UpadateById,DeleteById,CreateNewUser} = require('../controller/control');

const router = express.Router();

router.route('/').get(handleAllGetUsers).post(CreateNewUser);
// router.get("/",handleAllGetUsers);
// router.post("/",CreateNewUser);

router.route("/:id").get(GetUserById).patch(UpadateById).delete(DeleteById);


module.exports = router;




