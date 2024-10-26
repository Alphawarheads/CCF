const mongoose = require('mongoose');

const PanelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  production: { type: String, required: true },
  batteryTemp: { type: Number, required: true },
  dcPower: { type: Number, required: true },
  acPower: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Panel', PanelSchema);
