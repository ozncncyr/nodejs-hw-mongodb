import {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({ page, perPage, sortBy, sortOrder });

  res.json({
    status: 200,
    message: 'Contacts found successfully!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact not found.`));
    return;
  }

  res.json({
    status: 200,
    message: `Contact found successfully!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = await createContact(req.body);

  if (!contact) {
    next(createHttpError(400, 'Failed to create contact.'));
    return;
  }

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, `Contact not found.`));
    return;
  }

  res.status(204).json();
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(400, `Contact not found.`));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Contact upserted successfully.`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Contact patched successfully!`,
    data: result.contact,
  });
};
