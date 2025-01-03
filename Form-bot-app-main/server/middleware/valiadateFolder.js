const validateFolder = (req, res, next) => {
    const { name, parentFolderId } = req.body;
    const workspaceId = req.user.userId;
  
    // Basic validation checks
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Folder name is required' });
    }
    if (!workspaceId || typeof workspaceId !== 'string') {
      return res.status(400).json({ error: 'Workspace ID is required' });
    }
  
    next(); 
  };
  
  module.exports = validateFolder;
  