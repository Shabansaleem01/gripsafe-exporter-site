export interface Product {
  id: number;
  category: string;
  name: string;
  product_url: string;
  product_id: string;
  image_url_alibaba: string;
  image_url: string;
  localImagePath?: string;
  detail?: string;
  [key: string]: unknown;
}
