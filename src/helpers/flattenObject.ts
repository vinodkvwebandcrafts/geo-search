const ignoredColumns: string[] = [
  "createdAt",
  "updatedAt",
  "publishedAt",
  "id",
  "date",
  "createdBy",
  "updatedBy",
  "seo",
  "image",
  "documentId"
];

type FlattenedObject = Record<string, string | number>;

function shouldIgnoreKey(key: string): boolean {
  return ignoredColumns.includes(key);
}

function isValidValue(value: any): value is string | number {
  return value !== null && (typeof value === "string" || typeof value === "number");
}

function isIgnoredValue(key: string, value: any): boolean {
  return (
    shouldIgnoreKey(key) ||
    typeof value === "boolean" ||
    (typeof value === "string" && value.startsWith("/uploads/"))
  );
}

function flattenNestedObject(
  key: string,
  value: Record<string, any>,
  toReturn: FlattenedObject
) {
  const flatObject = flattenObject(value);
  for (const nestedKey in flatObject) {
    if (!Object.hasOwn(flatObject, nestedKey)) continue;
    if (!isNaN(flatObject[nestedKey] as number)) continue;
    if (shouldIgnoreKey(nestedKey)) continue;
    toReturn[`${key}.${nestedKey}`] = flatObject[nestedKey];
  }
}

export function flattenObject(
  ob: Record<string, any> | null
): FlattenedObject {
  const toReturn: FlattenedObject = {};

  if (!ob) return toReturn;

  for (const key in ob) {
    if (!Object.hasOwn(ob, key)) continue;
    if (shouldIgnoreKey(key)) continue;

    const value = ob[key];

    if (typeof value === "object" && value !== null) {
      flattenNestedObject(key, value, toReturn);
    } else if (!isIgnoredValue(key, value) && isValidValue(value)) {
      toReturn[key] = value;
    }
  }

  return toReturn;
}