const express = require('express');
const router = express.Router();
const usercontroller = require('../controlaer/Users');

router.post('/',usercontroller.insertUser);
router.get('/',usercontroller.getAllUsers);
router.put('/:name',usercontroller.updateUser);
router.delete('/:name',usercontroller.deleteUser);

module.exports = router;
