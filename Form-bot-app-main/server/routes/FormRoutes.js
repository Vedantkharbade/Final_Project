const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const { createForm, getForms, getForm, updateForm, deleteForm, getAllFormsDetailed } = require('../controllers/FormController');
const { shareForm, getPublicForm } = require('../controllers/FormLinkController');


router.post('/createform',verifyToken,createForm);
router.get('/getforms', verifyToken, getForms);
router.get('/allforms',verifyToken,getAllFormsDetailed)
router.get('/:id', getForm);
router.put('/:id', verifyToken, updateForm);
router.delete('/:id', verifyToken,deleteForm);
router.post('/:id/share', verifyToken,shareForm );
router.get('/forms/public/:shareableLink', getPublicForm);

module.exports = router;