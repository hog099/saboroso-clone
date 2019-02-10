var express = require('express');
var router = express.Router();
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservations');
var contacts = require('./../inc/contacts');

/* GET home page. */
router.get('/', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('index', {
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
    });

  });

});


router.get('/contacts', function (req, res, next) {
 
  contacts.render(req, res);

});

router.post('/contacts', function (req, res, next) {

  if (!req.body.name) {
    contacts.render(req, res, "Digite o Nome");
  } else if (!req.body.email) {
    contacts.render(req, res, "Digite o E-mail");
  } else if (!req.body.message) {
    contacts.render(req, res, "Digite a Mensagem");
  } else {
    contacts.save(req.body).then(results =>{
      req.body = [];
      contacts.render(req, res, null, "Contato Enviado com Sucesso!");
    }).catch(err=>{
      contacts.render(req, res, err.message);
    });

  }



});








router.get('/menus', function (req, res, next) {

  menus.getMenus().then(results => {

    res.render('menus', {
      title: 'menus - Restaurante Saboroso!',
      background: 'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results
    });

  });



});

router.get('/reservations', function (req, res, next) {
  
  reservations.render(req, res);
 
  });


router.post('/reservations', function (req, res, next) {

  if (!req.body.name) {
    reservations.render(req, res, "Digite o Nome");
  } else if (!req.body.email) {
    reservations.render(req, res, "Digite o E-mail");
  } else if (!req.body.people) {
    reservations.render(req, res, "Digite o Número de Pessoas");
  } else if (!req.body.date) {
    reservations.render(req, res, "Digite a Data");
  } else if (!req.body.time) {
    reservations.render(req, res, "Digite a Hora");
  } else {
    reservations.save(req.body).then(results =>{
      req.body = [];
      reservations.render(req, res, null, "Reserva realizada com Sucesso!");
    }).catch(err=>{
      reservations.render(req, res, err.message);
    });

  }



});



router.get('/services', function (req, res, next) {
  res.render('services', {
    title: ' Serviços - Restaurante Saboroso!',
    background: 'images/img_bg_1.jpg',
    h1: 'É um prazer poder Servir.'
  });
});








module.exports = router;
