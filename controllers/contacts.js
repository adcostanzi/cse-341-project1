const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  // #swagger.tags=["Contacts"]
  const result = await mongodb
    .getDB()
    .db("project1")
    .collection("contacts")
    .find();
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  });
};

const getSingle = async (req, res) => {
  // #swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDB()
    .db("project1")
    .collection("contacts")
    .find({ _id: contactId });
  result.toArray().then((contacts) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  // #swagger.tags=["Contacts"]
  if (!isBodyValid(req.body)) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDB()
    .db("project1")
    .collection("contacts")
    .insertOne(newContact);

  if (response.acknowledged) {
    res.status(201).json({ id: response.insertedId });
  } else {
    res
      .status(500)
      .json(
        response.error || "An error occured while trying to create contact."
      );
  }
};

const updateContact = async (req, res) => {
  // #swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);
  if (!isBodyValid(req.body)) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDB()
    .db("project1")
    .collection("contacts")
    .replaceOne({ _id: contactId }, newContact);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "An error occured while trying to update contact."
      );
  }
};

const deleteContact = async (req, res) => {
  // #swagger.tags=["Contacts"]
  const contactId = new ObjectId(req.params.id);

  const response = await mongodb
    .getDB()
    .db("project1")
    .collection("contacts")
    .deleteOne({ _id: contactId });

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "An error occured while trying to delete contact."
      );
  }
};

// Function to check if req.body is not empty or null
function isBodyValid(contact) {
  for (const key in contact) {
    if (!contact[key] || contact[key].trim() === "") {
      return false;
    }
  }
  return true;
}

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact,
};
