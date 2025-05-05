// utils/fileHelpers.js
const fs = require('fs');
const path = require('path');

function deleteFile(filePath) {
  if (!filePath) return false;

  const fullPath = path.join(process.cwd(), filePath);
  
  try {
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
}

function deleteCandidateFiles(candidate) {
  if (candidate && candidate.cvFileUrl) {
    return deleteFile(candidate.cvFileUrl);
  }
  return false;
}

module.exports = {
  deleteFile,
  deleteCandidateFiles
};