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

const getRefereesForMatch = async (req, res) => {
  try {
    // Find the first 10 referees with availability set to "All day"
    const referees = await Referee.find({ availability: "All day" }).limit(10);

    // Return the referees
    res.json(referees);
  } catch (error) {
    // If an error occurs, return an error response
    console.error("Error fetching referees:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function for getting all referees with pagination
async function getAllReferees(req, res) {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not provided

    // Calculate the index to start from
    const startIndex = (page - 1) * limit;

    // Find total count of referees
    const totalReferees = await Referee.countDocuments();

    // Find referees for the current page
    const referees = await Referee.find().skip(startIndex).limit(limit);

    return res.status(200).json({
      referees,
      currentPage: page,
      totalPages: Math.ceil(totalReferees / limit),
    });
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

async function searchReferees(req, res) {
  try {
    const { name, country, location, availability, role, page, limit } =
      req.query;

    // Set default values for page and limit if not provided
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const query = {};
    if (name) query.name = { $regex: new RegExp(name, "i") };
    if (country) query.country = { $regex: new RegExp(country, "i") };
    if (location) query.location = { $regex: new RegExp(location, "i") };
    if (availability)
      query.availability = { $regex: new RegExp(availability, "i") };
    if (role) query.role = role;

    // Count total number of documents matching the query
    const totalRefereesCount = await Referee.countDocuments(query);

    // Calculate total number of pages
    const totalPages = Math.ceil(totalRefereesCount / pageSize);

    // Execute query with pagination
    const referees = await Referee.find(query).skip(skip).limit(pageSize);

    res.json({
      referees,
      totalPages,
      currentPage: pageNumber,
    });
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
  searchReferees,
  getRefereesForMatch,
};
