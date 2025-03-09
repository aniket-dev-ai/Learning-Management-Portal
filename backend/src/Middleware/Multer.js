import multer from "multer";
import path from "path";

// 🛠️ Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // ✅ Files "uploads/" folder me save hongi
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // ✅ Extract extension
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName); // ✅ Save with unique filename
  },
});

// 🛑 File Type Filter (Allow Images & Videos)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/; // ✅ Video formats added
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only images (jpeg, jpg, png, gif) and videos (mp4, mov, avi, mkv) are allowed!"
      )
    );
  }
};

// 🚀 Multer Upload Middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

export default upload;
