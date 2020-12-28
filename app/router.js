const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);

router.get('/card/:id', mainController.cardPage);

router.get('/search', searchController.searchPage);

router.get('/search/element', searchController.cardsByElement);
router.get('/search/level', searchController.cardsByLevel);
router.get('/search/values', searchController.cardsByValue);
router.get('/search/name', searchController.cardsByName);

router.get('/deck', deckController.showDeck);
router.get('/deck/add/:id', deckController.addCard);
router.get('/deck/remove/:id', deckController.removeCard);

module.exports = router;