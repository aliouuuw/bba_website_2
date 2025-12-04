// Simple Bun static file server
Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;
    
    // Default to index.html for root
    if (path === '/' || path.endsWith('/')) {
      path += 'index.html';
    }
    
    // 1. Try exact path
    let file = Bun.file(`.${path}`);
    if (await file.exists()) {
      return new Response(file, {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
    
    // 2. Try adding .html (for clean URLs like /blog)
    if (!path.endsWith('.html')) {
      file = Bun.file(`.${path}.html`);
      if (await file.exists()) {
        return new Response(file, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
      }
    }
    
    // 404
    return new Response('Not Found', { status: 404 });
  },
});

console.log('🚀 Server running at http://localhost:3000');
