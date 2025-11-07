import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { logger } from '../utils/logger';
// import { errorHandler, notFound } from '../app/middlewares/error.middleware';
// import routes from '../app/routes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan logging
const morganFormat = ':method :url :status :response-time ms';
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message: string) => {
        logger.http(message.trim());
      },
    },
  }),
);

// Rate limiting
// app.use('/api/', limiter);

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
// app.use('/api/v1', routes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Error handling
// app.use(notFound);
// app.use(errorHandler);

export default app;
