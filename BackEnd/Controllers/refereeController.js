const Referee = require("../Models/Referee");

// Create a referee
async function createReferee(req, res) {
  try {
    const referee = new Referee(req.body);
    await referee.save();
    res.status(201).send(referee);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Get all referees
async function getAllReferees(req, res) {
  try {
    const referees = await Referee.find();
    return res.status(200).json(referees);
  } catch (error) {
    console.error("Error fetching referees:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get referee by ID
async function getRefereeById(req, res) {
  try {
    const referee = await Referee.findById(req.params.id);
    if (!referee) {
      return res.status(404).send();
    }
    res.send(referee);
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update referee by ID
async function updateRefereeById(req, res) {
  try {
    const referee = await Referee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!referee) {
      return res.status(404).send();
    }
    res.send(referee);
  } catch (error) {
    res.status(400).send(error);
  }
}

// Delete referee by ID
async function deleteRefereeById(req, res) {
  try {
    const referee = await Referee.findByIdAndDelete(req.params.id);
    if (!referee) {
      return res.status(404).send();
    }
    res.send(referee);
  } catch (error) {
    res.status(500).send(error);
  }
}


async function searchReferees(req, res){
    try {
      const { name, country, location, availability, role } = req.query;

      const query = {};
      if (name) query.name = { $regex: new RegExp(name, "i") };
      if (country) query.country = { $regex: new RegExp(country, "i") };
      if (location) query.location = { $regex: new RegExp(location, "i") };
      if (availability) query.availability = { $regex: new RegExp(availability, "i") };
      if (role) query.role = role;

      const referees = await Referee.find(query);

      res.json(referees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}


module.exports = {
  createReferee,
  getAllReferees,
  getRefereeById,
  updateRefereeById,
  deleteRefereeById,
  searchReferees
};