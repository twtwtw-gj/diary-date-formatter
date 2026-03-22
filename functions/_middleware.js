export async function onRequest(context) {
  const MAX_AGE_SECONDS = 60 * 60 * 24 * 365; // 1 years in seconds

  try {
    const response = await context.next();

    // 静的アセット（JS/CSS等）はmiddlewareのCache-Control設定をスキップ
    if (url.pathname.match(/\.(|html|js|css|woff2?|png|jpg|svg)$/)) {
      return next(); // _headers に任せる
    }

    // Clone the response to modify headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Cache-Control', `public, max-age=${MAX_AGE_SECONDS}`);

    return newResponse;
  } catch (err) {
    return new Response(`${err.message}\n${err.stack}`, { status: 500 });
  }
}
