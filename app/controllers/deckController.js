const dataMapper = require('../dataMapper');

const deckController = {

  showDeck: (req, res) => {
    
    return res.render('cardList',{
      cards: req.session.deck || [],
      title: "Deck courant",
      showRemoveLink: true
    });
    
  },

  addCard: (req, res) => {
    dataMapper.getOneCard(req.params.id, (err, cards) => {
      if (err) {
        console.error(err);
        return res.send(err);
      }

      const card = cards.rows[0];

      console.log(req.session.deck);

      // on s'assure que la variable existe en session
      if(!req.session.deck) {
        req.session.deck = [];
      }

      // on check si la carte n'est pas déjà dans le deck
      const present = req.session.deck.filter( x=>x.id == card.id ).length;
      
      // si la carte est présente ou que le deck est plein => on fait rien
      // (ici, on fait le test à l'envers)
      if (!present && req.session.deck.length < 5) {
        req.session.deck.push(card);
      }

      return res.redirect('/deck');
    });
  },

  removeCard: (req, res) => {
    // un petit check qui vaut pas cher et qui évite bien des soucis
    if (!req.session.deck) {
      req.session.deck = [];
    }

    // on filtre le deck directement dans la session.
    // oui, c'est tout ! :) 
    req.session.deck = req.session.deck.filter( x =>  x.id != req.params.id);
    
    return res.redirect('/deck');
  }

};

module.exports = deckController;