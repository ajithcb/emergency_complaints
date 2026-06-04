const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const User = require("./models/User");
const Complaint = require("./models/Complaint");

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// ----- MongoDB Connection -----
mongoose.connect("mongodb://admin:1507009150@ac-ehtohag-shard-00-00.akzjspp.mongodb.net:27017,ac-ehtohag-shard-00-01.akzjspp.mongodb.net:27017,ac-ehtohag-shard-00-02.akzjspp.mongodb.net:27017/emergency_complaints?ssl=true&replicaSet=atlas-mqymi0-shard-0&authSource=admin&retryWrites=true&w=majority")
.then(() => console.log("MongoDB Atlas connected ✅"))
.catch(err => console.log("DB error:", err));

// ----- Routes -----

// User Signup
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json({ message: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists) return res.json({ message: "Email already exists" });

  const user = new User({ email, password });
  await user.save();
  res.json({ message: "Signup successful" });
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) return res.json({ message: "Invalid credentials" });
  res.json({ message: "Login successful" });
});

// Submit Complaint
app.post("/submit", async (req, res) => {
  const { email, issue, description } = req.body;
  const complaint = new Complaint({ username: email, issue, description });
  await complaint.save();
  res.json({ message: "Complaint submitted successfully" });
});

// Track complaints (user)
app.get("/track/:email", async (req, res) => {
  const complaints = await Complaint.find({ username: req.params.email });
  res.json(complaints);
});

// Admin Login
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if(username === "admin" && password === "1507009150"){
    res.json({ message: "Admin login successful" });
  } else res.json({ message: "Invalid credentials" });
});

// Admin view all complaints
app.get("/admin/complaints", async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

// Admin update status
app.post("/admin/update", async (req, res) => {
  const { id, status } = req.body;
  await Complaint.findByIdAndUpdate(id, { status });
  res.json({ message: "Updated" });
});

// ----- Start Server -----
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
