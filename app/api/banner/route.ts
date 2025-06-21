// app/api/banner/route.ts
export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Banner</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            font-size: 24px;
            background: #f9f9f9;
          }
        </style>
      </head>
      <body>
        🚀 Hello from Dynamic HTML Banner!
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
