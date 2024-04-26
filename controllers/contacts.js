const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;



const getAll = async (req, res) => {
    const result = await mongodb.getDB().db("project1").collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
}



const getSingle = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDB().db("project1").collection("contacts").find({ _id: contactId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });
}


module.exports = {getAll, getSingle};