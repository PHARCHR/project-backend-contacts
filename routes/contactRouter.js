const express = require("express");
const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contacts");
const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);
contactRouter.get("/:id", getContact);
contactRouter.post("/", createContact);
contactRouter.patch("/:id", updateContact);
contactRouter.delete("/:id", deleteContact);
module.exports = contactRouter;
