import { readFile, stat } from 'fs/promises';

Bun.serve({
  
  /** @param { Request } request */
  async fetch(request) {
    const url = new URL(request.url);

    console.log(`${ request.method } ${ url.pathname }`);

    if (url.pathname == '/' || url.pathname == '/index.php') {
      const file = await readFile('./index.php', { encoding: 'utf-8' });

      return new Response(file, {
        headers: {
          'content-type': 'text/html'
        }
      });
    }

    if (await stat('.' + url.pathname).catch(() => false)) {
      const extension = url.pathname.split('.').at(-1);

      const map = {
        'js': 'application/javascript',
        'css': 'text/css',
        'jpeg': 'image/jpeg',
      }

      return new Response(await readFile('.' + url.pathname), {
        headers: {
          'content-type': map[extension]
        }
      });
    }
    
    return new Response("Hello, World!");
  }
})