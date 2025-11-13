import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  return ContactsCollection.find({});
};

export const getContactById = async contactId => {
  return ContactsCollection.findById(contactId);
};

export const createContact = async payload => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const deleteContact = async contactId => {
  const result = await ContactsCollection.findByIdAndDelete(contactId);
  return result;
};

export const updateContact = async (contactId, payload) => {
  const options = { new: true, upsert: true, runValidators: true };
  const rawResult = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    options
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
