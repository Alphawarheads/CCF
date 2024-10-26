const Panel = require('../models/Panel');

// Get all panels
exports.getPanels = async (req, res) => {
  try {
    const panels = await Panel.find();
    res.json(panels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new panel
exports.addPanel = async (req, res) => {
  const { name, production, batteryTemp, dcPower, acPower } = req.body;
  const newPanel = new Panel({ name, production, batteryTemp, dcPower, acPower });

  try {
    const savedPanel = await newPanel.save();
    res.status(201).json(savedPanel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a panel
exports.updatePanel = async (req, res) => {
  try {
    const panel = await Panel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!panel) return res.status(404).json({ message: "Panel not found" });
    res.json(panel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a panel
exports.deletePanel = async (req, res) => {
  try {
    const panel = await Panel.findByIdAndDelete(req.params.id);
    if (!panel) return res.status(404).json({ message: "Panel not found" });
    res.json({ message: "Panel deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
