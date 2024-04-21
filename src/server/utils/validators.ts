export function validateRequiredStrings(obj: { [key: string]: { value: string; min: number; max: number } }) {
    let issues: string[] = [];

    Object.entries(obj).forEach(([key, { value, min, max }]) => {
        if (!value) {
            issues.push(`"${key}" is a required element`);
            return;
        }

        if (typeof value !== "string") {
            issues.push(`"${key}" must be of the type string`);
            return;
        }

        if (value.length < min) {
            issues.push(`"${key}" must be between ${min} and ${max} characters`);
        }
    });

    return issues.join(",\n");
}

function isString(value: any): value is string {
    return typeof value === "string";
}
