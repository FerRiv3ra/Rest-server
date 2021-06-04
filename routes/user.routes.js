const { Router } = require('express');
const { userGet, userPost, userDelete, userPatch, userPut } = require('../controllers/user');

const router = Router();

router.get('/:id', userGet);
router.post('/', userPost);
router.delete('/', userDelete);
router.patch('/', userPatch);
router.put('/', userPut);

module.exports = router;