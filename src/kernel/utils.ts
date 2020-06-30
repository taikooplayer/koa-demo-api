

export function objectKeySort(obj) {
  if (!(obj instanceof Object)) {
    return obj;
  }
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return obj;
  }
  keys.sort();
  const newObj = {};
  for (const i of keys) {
    newObj[i] = obj[i];
  }
  return newObj;
}

export function parseRequestCookies(cookies: any) {
  // if (!cookies || !cookies instanceof Array) return {};
  const cookie = {};
  for (const val of cookies) {
    const arr = val.split(';');
    const co = arr[0].split('=');
    cookie[co[0]] = co[1];
  }
  return cookie;
}