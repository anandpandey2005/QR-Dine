import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rootRouter from './routes/index.routes.js';
import productRoutes from './routes/product.routes.js';
import { routesDocumentation } from '../public/routesDocuments.js';
import { number } from 'zod';
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
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }),
);
app.use(compression());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', uptime: process.uptime() });
});

// Routes

app.get('/', (req: Request, res: Response) => {
  let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Restaurant API Documentation</title>
      <style>
        * { box-sizing: border-box; }
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          /* Deep dark gradient background */
          background: linear-gradient(135deg, #0f0c29, #2c2c2d, #24243e); 
          color: #e0e0e0; 
          margin: 0; 
          padding: 40px 20px; 
          min-height: 100vh;
        }
        
        .container { 
          max-width: 1400px; /* Wider container for full feel */
          margin: 0 auto; 
          width: 100%; 
        }
        
        h1 { 
          text-align: center; 
          color: #ffffff; 
          margin-bottom: 10px; 
          font-size: 2.8em;
          text-shadow: 0 4px 10px rgba(0,0,0,0.5);
        }
        
        .stats { 
          text-align: center; 
          color: #a8a8b3; 
          margin-bottom: 40px; 
          font-size: 1.1em; 
        }
        .stats strong { color: #ffffff; }

        /* Grid layout to make the cards sit side-by-side on large screens */
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 25px;
        }

        /* 💎 Glassmorphism Card Effect 💎 */
        .category-card { 
          background: rgba(255, 255, 255, 0.03); 
          backdrop-filter: blur(16px); 
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.08); 
          border-radius: 16px; 
          padding: 25px; 
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3); 
          transition: transform 0.2s ease;
        }
        .category-card:hover {
          transform: translateY(-5px);
          border: 1px solid rgba(255, 255, 255, 0.15); 
        }

        .category-title { 
          margin-top: 0; 
          color: #ffffff; 
          text-transform: uppercase; 
          border-bottom: 1px solid rgba(255, 255, 255, 0.1); 
          padding-bottom: 15px; 
          letter-spacing: 2px;
        }

        .route-item { 
          display: flex; 
          align-items: center; 
          padding: 15px 0; 
          border-bottom: 1px solid rgba(255, 255, 255, 0.05); 
        }
        .route-item:last-child { border-bottom: none; padding-bottom: 0; }
        
        /* Badges for HTTP Methods - Tuned for dark mode */
        .method { 
          padding: 6px 12px; 
          border-radius: 6px; 
          font-weight: bold; 
          color: white; 
          width: 75px; 
          text-align: center; 
          font-size: 0.85em; 
          margin-right: 15px; 
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .method.GET { background-color: #3b82f6; }    /* Bright Blue */
        .method.POST { background-color: #10b981; }   /* Mint Green */
        .method.PUT { background-color: #f59e0b; }    /* Amber */
        .method.PATCH { background-color: #f59e0b; }  /* Amber */
        .method.DELETE { background-color: #ef4444; } /* Rose Red */
        
        .path { 
          font-family: 'Courier New', Courier, monospace; 
          font-size: 1.05em; 
          font-weight: 600; 
          color: #60a5fa; /* Neon blue for the path */
          width: 240px; 
          word-break: break-all;
        }
        
        .desc { 
          color: #a1a1aa; 
          flex-grow: 1; 
          font-size: 0.95em;
          line-height: 1.4;
        }

        /* Make it mobile friendly */
        @media (max-width: 768px) {
          .route-item { flex-direction: column; align-items: flex-start; gap: 10px; }
          .path { width: 100%; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>API Documentation</h1>
  `;

  const categories = Object.keys(routesDocumentation.apiRoutes);
  let totalRoutesCount = 0;
  let cardsHtml = '';

  for (const [categoryName, routes] of Object.entries(routesDocumentation.apiRoutes)) {
    if (Array.isArray(routes)) {
      totalRoutesCount += routes.length;

      cardsHtml += `
        <div class="category-card">
          <h2 class="category-title">${categoryName}</h2>
      `;

      routes.forEach((route: any) => {
        cardsHtml += `
          <div class="route-item">
            <span class="method ${route.method}">${route.method}</span>
            <span class="path">${route.path}</span>
            <span class="desc">${route.description}</span>
          </div>
        `;
      });

      cardsHtml += `</div>`;
    }
  }

  html += `
        <div class="stats">
          <strong>${categories.length}</strong> Categories | <strong>${totalRoutesCount}</strong> Total Endpoints
        </div>
        
        <div class="cards-grid">
          ${cardsHtml}
        </div>
        
      </div>
    </body>
    </html>
  `;
  
  res.send(html);
});
app.use('/api/v1', rootRouter);

app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'This path not exist or might be changed' });
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
