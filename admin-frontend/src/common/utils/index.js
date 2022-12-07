export const toObjectWithCamelCaseKeys = (object) => {
    const newObj = {};
    for (const [key, value] of Object.entries(object)) {
        const newKey = key[0].toLowerCase() + key.slice(1);
        newObj[newKey] = value;
    }
    return newObj;
};

export const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
