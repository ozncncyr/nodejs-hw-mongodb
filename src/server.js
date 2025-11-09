import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const PORT = Number(env('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    if (!contacts.length) {
      res.status(200).json({
        status: 200,
        message: 'The contacts list is empty or not found.',
        data: [],
      });
      return;
    }

    res.status(200).json({
      status: 200,
      message: `Contacts fetched successfully! We found ${contacts.length} contacts.`,
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    const isValidObjectId = /^[a-fA-F0-9]{24}$/.test(contactId);

    if (!isValidObjectId) {
      return res.status(404).json({
        status: 404,
        message: `Invalid contact ID format or unexisted route.`,
        data: null,
      });
    }
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: `Contact with id ${contactId} not found.`,
        data: null,
      });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
      error: `Route ${req.originalUrl} does not exist`,
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
