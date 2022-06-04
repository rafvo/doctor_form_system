export function getObjValue(obj, { key } = {}) {
  if (!key) return null;

  const value = key.split(".").reduce(function (p, prop) {
    return p[prop];
  }, obj);

  return value;
}

export function assign(obj, prop, value) {
  if (typeof prop === "string") prop = prop.split(".");

  if (prop.length > 1) {
    var e = prop.shift();
    assign(
      (obj[e] =
        Object.prototype.toString.call(obj[e]) === "[object Object]"
          ? obj[e]
          : {}),
      prop,
      value
    );
  } else obj[prop[0]] = value;
}
