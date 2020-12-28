const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: (req, res) => {
    dataMapper.getAllCards( (err, cards) => {
      if(err) {
        console.error(err);
        return;
      } 
      res.render('cardList', {
        cards: cards.rows,
        title: 'Liste des cartes'
      })
    });
  },

  cardPage: (req, res) => {
    dataMapper.getOneCard(req.params.id, (err, cards) => {
      if(err) {
        console.error(err);
        return res.send(err);
      } 

      res.render('details', cards.rows[0]);

    });
  }
};

module.exports = mainController;