const isObject = (v: any) => typeof v === "object" && v !== null;

const createDiffEntry = (oldVal: any, newVal: any) => ({
  old_component_name: oldVal?.__component,
  old: oldVal,
  new_component_name: newVal?.__component,
  new: newVal,
});

export function getDifference(
  obj1: Record<string, any>,
  obj2: Record<string, any>,
  path = ""
): Record<string, any> | null {
  const differences: Record<string, any> = {};

  const handleValueDiff = (
    key: string,
    valA: any,
    valB: any,
    base: string
  ) => {
    const fullPath = base ? `${base}.${key}` : key;

    if (isObject(valA) && isObject(valB)) {
      recurse(valA, valB, fullPath);
      return;
    }

    if (valA !== valB) {
      differences[fullPath] = createDiffEntry(valA, valB);
    }
  };

  const recurse = (
    a: Record<string, any>,
    b: Record<string, any>,
    base: string
  ) => {
    for (const key of Object.keys(a)) {
      if (Object.hasOwn(b, key)) {
        handleValueDiff(key, a[key], b[key], base);
      } else {
        const fullPath = base ? `${base}.${key}` : key;
        differences[fullPath] = createDiffEntry(a[key], undefined);
      }
    }

    for (const key of Object.keys(b)) {
      if (!Object.hasOwn(a, key)) {
        const fullPath = base ? `${base}.${key}` : key;
        differences[fullPath] = createDiffEntry(undefined, b[key]);
      }
    }
  };

  recurse(obj1, obj2, path);

  return Object.keys(differences).length > 0 ? differences : null;
}