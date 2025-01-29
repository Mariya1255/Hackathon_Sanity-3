export interface Product {
    _id: string;
    name: string;
    _type: "product";
    price: number;
    description: string;
    image?: {
      asset:{
        _ref: string;
        _type: "image";
      }
    }
    category: string;
    discountPercentage: number;
    stockLevel: number;
    slug: { current: string };
    
  }