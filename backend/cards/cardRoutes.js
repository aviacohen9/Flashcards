const { Router } = require('express');
const  cardController = require('../cards/cardController');
const  requireAuth = require('../auth/requireAuth');


const router = Router()

// middlware to require auth for all cards endpoints
router.use(requireAuth)

//cards API endpoints
router.get('/', cardController.getAllCards)
router.post('/addCard', cardController.addCard)
router.get('/:card_id', cardController.getCard)
router.patch('/editcard/:card_id', cardController.editCard)
router.delete('/:card_id', cardController.deleteCard)

module.exports = router;