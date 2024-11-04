const mongoose = require("mongoose");
const Contact = require("../models/contacts");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../error/BadRequest");
const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).send(contacts);
};
const getContact = async(req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const contacts = await Contact.findOne({
    _id: id,
    createdBy: userId,
  });
  if (!contacts) {
    throw BadRequest("Please enter valid credentials");
  }
  res.status(StatusCodes.OK).send(contacts);
};
const createContact = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const contacts = await Contact.create({ ...req.body });
  res.status(StatusCodes.CREATED).send(contacts);
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const { name, number } = req.body;
  if (!name || !number) {
    throw BadRequest("Please enter name and number");
  }

  const contacts = await Contact.findByIdAndUpdate(
    { _id: id, createdBy: userId },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!contacts) {
    throw BadRequest("Please enter valid credentials");
  }
  res.status(StatusCodes.OK).send(contacts);
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const contacts = await Contact.findByIdAndDelete({
    _id: id,
    createdBy: userId,
  });
  if (!contacts) {
    throw BadRequest("Please enter valid credentials");
  }
  res.status(StatusCodes.OK).send("DELETED SUCCESSFULLY");
};
module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
