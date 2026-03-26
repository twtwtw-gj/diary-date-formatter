export async function onRequest(context) {
  const MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

  const { request, next, waitUntil } = context;
  const url = new URL(request.url);

  if (!url.pathname.startsWith("/api/")) {
    return next();
  }

  const cache = caches.default;
  const cacheKey = new Request(request.url);

  let response = await cache.match(cacheKey);
  if (response) return response;

  response = await next();

  const newResponse = new Response(response.body, response);

  newResponse.headers.set(
    "Cache-Control",
    `public, max-age=${MAX_AGE_SECONDS}`
  );

  waitUntil(cache.put(cacheKey, newResponse.clone()));

  return newResponse;
}