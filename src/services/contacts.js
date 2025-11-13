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
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
