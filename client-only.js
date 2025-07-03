// Simple server to serve static files for front-end only
import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

// For development, use Vite's dev server
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  // Set up Vite dev server for development
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: path.join(__dirname, 'client'),
  });

  app.use(vite.middlewares);
} else {
  // For production, serve the built files
  app.use(express.static(path.join(__dirname, 'dist')));
  
  // For SPA, send index.html for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Front-end server running on port ${PORT}`);
});