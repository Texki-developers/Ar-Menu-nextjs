import { NextRequest } from 'next/server';

// app/api/banner/route.ts
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('title');
  const items = url?.split('_');
  const title = items?.[0] === 'undefined' ? '' : items?.[0];
  const kcal = items?.[1] === 'undefined' ? '' : items?.[1];
  const fat = items?.[2] === 'undefined' ? '' : items?.[2];
  const sugar = items?.[3] === 'undefined' ? '' : items?.[3];
  const protein = items?.[4] === 'undefined' ? '' : items?.[4];
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0" />
        <title>AR Daddy</title>
        <style type="text/css">
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          .container {
            width: 100%;
            height: 100%;
            background: #000000;
            color: white;
            padding: 20px;
            font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
          }
          .title {
            width: 100%;
            text-align: center;
            font-size: larger;
            margin-bottom: 5px;
          }
          .title span {
            font-size: medium;
            font-weight: 500;
          }
          .items {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          .item {
            padding: 5px 10px;
            margin-top: 10px;
          }
          .item.border {
            border-left: 1px solid white;
          }
          .item h6 {
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="title">${title}</h1>
          ${kcal ? `<h1 class="title">${kcal} <span>kcal</span></h1>` : ''}
          <div class="items">
            ${
              fat
                ? `<div class="item">
              <h6>Fat</h6>
              <p>${fat}g</p>
            </div>`
                : ''
            }
            ${
              sugar
                ? `<div class="item border">
              <h6>Sugar</h6>
              <p>${sugar}g</p>
            </div>`
                : ''
            }
            ${
              protein
                ? `<div class="item border">
              <h6>Protein</h6>
              <p>${protein}g</p>
            </div>`
                : ''
            }
          </div>
        </div>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
