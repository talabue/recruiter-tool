import express from "express";
import Candidate from "../models/Candidate.js";
import authMiddleware from "../middleware/authMiddleware.js";
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url); // Resolve directory name
const __dirname = dirname(__filename);
const router = express.Router();
const storage = multer.diskStorage({ //Define storage location and filename
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
const upload = multer({ storage }); //initialize multer with storage options

// Create a Candidate
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, email, phone, resumeUrl, status } = req.body;
    const candidate = new Candidate({ name, email, phone, resumeUrl, status });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Candidates
router.get('/', async (req, res) => {
    try {
      const candidates = await Candidate.find().select('_id name email phone resumeUrl status createdAt'); 
      res.json(candidates);
    } catch (error) {
      res.status(500).json({ message: 'Server error retrieving candidates' });
    }
  });
  

// Get a Single Candidate
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update Candidate
router.put('/:id', authMiddleware, upload.single('resume'), async (req, res) => {
    try {
      const { name, email, phone, status } = req.body;
      const candidateId = req.params.id;
  
      let updateData = { name, email, phone, status };
      
      if (req.file) {
        updateData.resumeUrl = `uploads/${req.file.filename}`; 
      }
  
      const updatedCandidate = await Candidate.findByIdAndUpdate(candidateId, updateData, { new: true });
  
      if (!updatedCandidate) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
  
      res.json(updatedCandidate);
    } catch (error) {
      console.error('❌ Error updating candidate:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Delete a Candidate
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate)
      return res.status(404).json({ message: "Candidate not found" });
    res.json({ message: "Candidate deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

//Allow only PDF, DOC, DOCX, and TXT files (Unused in this context)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed."),
      false
    );
  }
};

// Route to add a candidate with resume upload
router.post("/", upload.single("resume"), async (req, res) => {
  try {
    const { name, email } = req.body;
    const resumePath = req.file ? req.file.path : null;

    const candidate = new Candidate({
      name,
      email,
      resume: resumePath,
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Error adding candidate", error });
  }
});

// Serve uploaded files
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Update Candidate Route
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );

    if (!updatedCandidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json(updatedCandidate);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;