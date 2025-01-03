const express = require('express');
const router = express.Router();
const {createFolder, getFolderById, deleteFolderById, getAllFolders} = require('../controllers/FolderController');
const verifyToken = require('../middleware/verifyToken');
const validateFolder = require('../middleware/valiadateFolder');

router.post('/create-folder', verifyToken ,validateFolder,createFolder);
router.get('/getfolders',verifyToken, getFolderById);
router.get('/allfolders',verifyToken,getAllFolders)
router.delete('/folders/:id', verifyToken, deleteFolderById);

module.exports = router;