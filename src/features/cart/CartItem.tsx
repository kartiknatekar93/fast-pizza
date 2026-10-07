import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "../../ui/DeleteItem";
import UpdateQuantity from "./UpdateQuantity";
import { useSelector } from "react-redux";
import { getCurrentQuantityById } from "./CartSlice";
import type { cartItem } from "./CartSlice";

interface CartItemProps {
  item: cartItem;
}

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem id={pizzaId}></DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;
