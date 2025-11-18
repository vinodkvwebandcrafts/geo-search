import widgets from "./mappings";

export function checkComponentsExist(components?: string[]): void {
    const missingComponents = components?.filter((key) => !(key in widgets));

    if (missingComponents && missingComponents.length > 0) {
        console.log("Missing components:", missingComponents);
    }
}
