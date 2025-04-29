const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, GIF, and PDF are allowed.")
    );
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Upload image function
const uploadImage = async (file) => {
  try {
    // With disk storage, the file is already saved to disk by multer
    // We just need to return the path
    return `/${file.path.replace(/\\/g, "/")}`;
  } catch (error) {
    console.error("Upload error:", error);
    throw new Error("Error uploading image");
  }
};

// Delete image function
const deleteImage = async (filepath) => {
  try {
    if (!filepath) return;

    // Remove the leading slash if present
    const normalizedPath = filepath.startsWith("/")
      ? filepath.substring(1)
      : filepath;
    const fullPath = path.join(process.cwd(), normalizedPath);

    if (fs.existsSync(fullPath)) {
      await promisify(fs.unlink)(fullPath);
    }
  } catch (error) {
    console.error("Delete error:", error);
    throw new Error("Error deleting image");
  }
};

module.exports = {
  upload,
  uploadImage,
  deleteImage,
};
