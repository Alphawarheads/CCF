const express = require('express');
const router = express.Router();
const panelController = require('../controllers/panelController');

router.get('/', panelController.getPanels);
router.post('/', panelController.addPanel);
router.put('/:id', panelController.updatePanel);
router.delete('/:id', panelController.deletePanel);

module.exports = router;
