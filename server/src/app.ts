import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import rootRouter from './routes/index.routes.js';
import productRoutes from './routes/product.routes.js';
import { routesDocumentation } from '../public/routesDocuments.js';

const app: Application = express();
// GLOBAL MIDDLEWARE

app.use(helmet());

let corsUrl: string = process.env.CLIENT_URL || ' ';

if (process.env.NODE_ENV === 'development') {
  corsUrl = '*';
}
 
app.use(
  cors({
    origin: corsUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  }),
);
app.use(compression());

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

app.get('/', (req: Request, res: Response) => {
  const frontendUrl = process.env.CLIENT_URL || '#';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to QR-Dine</title>
      <style>
        * { box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          background: linear-gradient(135deg, #0f0c29, #2c2c2d, #24243e); 
          color: #e0e0e0; 
          margin: 0; 
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
        
        .container { 
          background: rgba(255, 255, 255, 0.03); 
          backdrop-filter: blur(16px); 
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08); 
          border-radius: 24px; 
          padding: 60px 40px; 
          text-align: center;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); 
          max-width: 600px;
          width: 90%;
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        h1 { 
          color: #ffffff; 
          margin-top: 0;
          margin-bottom: 10px; 
          font-size: 3.5em;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5);
          letter-spacing: 2px;
        }
        
        p { 
          color: #a8a8b3; 
          margin-bottom: 40px; 
          font-size: 1.2em; 
          line-height: 1.5;
        }

        .btn-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          text-decoration: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 600;
          font-size: 1.1em;
          transition: all 0.3s ease;
          display: inline-block;
        }

        .btn-frontend {
          background-color: #3b82f6;
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .btn-frontend:hover {
          background-color: #2563eb;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
        }

        .btn-api {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .btn-api:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }

      </style>
    </head>
    <body>
      <div class="container">
        <h1>QR-Dine</h1>
        <p>Welcome to the core server. Where would you like to go?</p>
        <div class="btn-container">
          <a href="${frontendUrl}" class="btn btn-frontend">Go to Frontend</a>
          <a href="/api" class="btn btn-api">API Documentation</a>
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});


app.get('/api', (req: Request, res: Response) => {

  res.send(routesDocumentation);
});

app.use('/api/v1', rootRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'This path does not exist or might be changed' });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(`[Error] ${err.message}`);
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
});

export default app;
