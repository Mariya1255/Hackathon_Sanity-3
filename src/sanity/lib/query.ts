export const query = `*[_type == "product"]`;
export const four = `*[_type == "product"] | order(_createdAt desc) [0...4]`;
