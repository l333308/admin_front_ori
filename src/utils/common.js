export function buildQueryString(query) {
  const esc = encodeURIComponent;
  return Object.keys(query).map(k => esc(k) + '=' + esc(query[k])).join('&');
}
