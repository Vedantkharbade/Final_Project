const Folder = require('../model/FolderSchema');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const createFolder = async (req, res) => {
  try {
    const { name, parentFolderId } = req.body;
    const workspaceId = req.user.userId;

    console.log('Request Body:', req.body);
    console.log('Workspace ID:', workspaceId);

    const newFolder = new Folder({
      name,
      workspaceId,
      parentFolderId: parentFolderId ? parentFolderId : uuidv4(),
      forms: [],
    });

    await newFolder.save();

    res.status(201).json({
      folder: {
        id: newFolder._id,
        createdAt: newFolder.createdAt,
        updatedAt: newFolder.updatedAt,
        name: newFolder.name,
        parentFolderId: newFolder.parentFolderId,
        workspaceId: newFolder.workspaceId,
      },
    });
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(500).json({ error: 'Failed to create folder' });
  }
};

const getFolderById = async (req, res) => {
  try {
    const workspaceId = req.user.userId;

    const folders = await Folder.find({ workspaceId });

    res.status(200).json({
      folders: folders.map(folder => ({
        id: folder._id,
        name: folder.name,
        parentFolderId: folder.parentFolderId,
        createdAt: folder.createdAt,
        updatedAt: folder.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
};

const deleteFolderById = async (req, res) => {
  try {
    const { id } = req.params;
    await Folder.findByIdAndDelete(id);
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    res.status(500).json({ error: 'Failed to delete folder' });
  }
};

const getAllFolders = async (req, res) => {
  try {
    const { folderId } = req.query;
    const workspaceId = req.user.userId;

    let folders;
    if (folderId) {
      folders = await Folder.find({ workspaceId, _id: folderId })
        .populate({
          path: 'forms',
          select: 'title description createdAt',
          options: { sort: { createdAt: -1 } }
        });
    } else {
      folders = await Folder.find({ workspaceId })
        .populate({
          path: 'forms',
          select: 'title description createdAt',
          options: { sort: { createdAt: -1 } }
        });
    }

    const detailedFolders = folders.map(folder => ({
      id: folder._id,
      name: folder.name,
      createdAt: folder.createdAt,
      formCount: folder.forms.length,
      forms: folder.forms.map(form => ({
        id: form._id,
        title: form.title,
        description: form.description,
        createdAt: form.createdAt
      }))
    }));

    res.json(detailedFolders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createFolder, getFolderById, deleteFolderById, getAllFolders };
