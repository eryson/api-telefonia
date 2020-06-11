const express = require('express');
const router = express.Router();

const RamalController = require('../controllers/ramal-controller');

// RETORNA TODOS OS RAMAIS
router.get('/', RamalController.getRamal);

// INSERE UM RAMAL
router.post('/', RamalController.postRamal);

// RETORNA OS DADOS DE UM RAMAL
router.get('/:id_ramal', RamalController.getUmRamal);

// ALTERA UM RAMAL
router.patch('/', RamalController.updateRamal);

// EXCLUI UM RAMAL
router.delete('/', RamalController.deleteRamal);

module.exports = router;