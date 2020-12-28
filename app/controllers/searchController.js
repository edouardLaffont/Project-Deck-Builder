const dataMapper = require('../dataMapper');

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  cardsByElement: (req, res) => {
    dataMapper.getCardsByExactProperty('element', req.query.element, (err, cards) => {
      if( err) {
        console.error(err);
        return res.send(err);
      }

      const elementTitle = req.query.element == 'null' ? "aucun" : req.query.element;

      res.render('cardList',{
        cards: cards.rows,
        title: "Liste des cartes - Élément : "+elementTitle
      });
    });
  },

  cardsByLevel: (req, res) => {
    dataMapper.getCardsByExactProperty('level', req.query.level, (err, cards) => {
      if( err) {
        console.error(err);
        return res.send(err);
      }

      res.render('cardList', {
        cards: cards.rows,
        title: "Liste des cartes - Niveau : "+req.query.level
      });
    });
  },

  cardsByValue: (req, res) => {
    dataMapper.getCardsByValue(req.query.direction, req.query.value, (err, cards) => {
      if( err) {
        console.error(err);
        return res.send(err);
      }

      res.render('cardList', {
        cards: cards.rows,
        title: "List des cartes - Valeur "+req.query.direction+" > "+req.query.value
      });
    });
  },

  cardsByName: (req, res) => {
    dataMapper.getCardsByName(req.query.name, (err, cards) => {
      if( err) {
        console.error(err);
        return res.send(err);
      }

      res.render('cardList', {
        cards: cards.rows,
        title: "List des cartes - Nom contenant : "+req.query.name
      });
    });
  }

};

module.exports = searchController;