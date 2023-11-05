import { Buyer, Producer, Product, Purchase } from "./sales.models";

export interface Sale {
  product: Product;
  buyer: Buyer;
  producer: Producer;
  purchase: Purchase;
}
