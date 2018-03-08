import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCart } from './shopping-cart';
import { CheckOutInformation } from './checkoutInformation';
import { Products } from './Products';
export class Order
{
orderId;    
datePlaced;
shippingInfo:CheckOutInformation;
userId:string;
shoppingCart:ShoppingCart;
items:ShoppingCartItem[];

}