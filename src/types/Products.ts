export type Brand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type SubCategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
};

export type Products = {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;

  imageCover: string;
  images: string[];

  price: number;
  priceAfterDiscount: number;

  quantity: number;
  sold: number;

  ratingsAverage: number;
  ratingsQuantity: number;

  createdAt: string;
  updatedAt: string;

  brand: Brand;
  category: Category;
  subcategory: SubCategory[];
};

export type OneProduct = {
  _id: string;
  id?: string;
  title: string;
  slug?: string;
  description: string;

  imageCover: string;
  images: string[];

  price: number;
  quantity?: number;
  sold: number;

  ratingsAverage: number;
  ratingsQuantity: number;

  availableColors?: string[];

  createdAt?: string;
  updatedAt?: string;
  __v?: number;

  brand: {
    _id?: string;
    name: string;
    slug?: string;
    image?: string;
  };

  category: {
    _id?: string;
    name: string;
    slug?: string;
    image?: string;
  };

  subcategory: {
    _id?: string;
    name: string;
    slug?: string;
    category?: string;
  }[];

  reviews?: {
    _id: string;
    review: string;
    rating: number;
    createdAt: string;
    updatedAt?: string;
    __v?: number;
    product?: string;
    user: {
      _id?: string;
      name: string;
    };
  }[];
};


export type CartItem = {
  _id: string;
  count: number;
  price: number;
  product: Products;
};

export type Cart = {
  _id: string;
  cartOwner: string;
  products: CartItem[];
  totalCartPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CartResponse = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: Cart;
};

type OrderProduct = {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  brand: { _id: string; name: string; slug: string; image: string };
  category: { _id: string; name: string; slug: string; image: string };
  subcategory: { _id: string; name: string; slug: string; category: string }[];
};


type ShippingAddress = {
  city: string;
  details: string;
  phone: string;
  postalCode: string;
};

export type Order = {
  id: number;
  cartItems: CartItem[];
  createdAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paymentMethodType: string;
  shippingAddress: ShippingAddress;
  shippingPrice: number;
  taxPrice: number;
  totalOrderPrice: number;
};

export type Wish = {
  status : string;
  count : number ;
  data : Products;
}