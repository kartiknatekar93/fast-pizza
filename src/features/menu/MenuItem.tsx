import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import {
  addItem,
  getCurrentQuantityById,
  type cartItem,
} from "../cart/CartSlice";
import DeleteItem from "../../ui/DeleteItem";
import UpdateQuantity from "../cart/UpdateQuantity";
import type { Pizza } from "../../services/apiRestaurant";
import type { AppDispatch } from "../../store";

interface MenuItemProps {
  pizza: Pizza;
}

function MenuItem({ pizza }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch<AppDispatch>();

  function addItemHandler() {
    const item: cartItem = {
      pizzaId: String(id),
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(item));
  }

  const currentQuantity = useSelector(getCurrentQuantityById(String(id)));

  const isIncart = currentQuantity > 0;

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {isIncart && (
            <UpdateQuantity
              pizzaId={String(id)}
              currentQuantity={currentQuantity}
            />
          )}

          {isIncart && <DeleteItem id={String(id)} />}

          {!soldOut && !isIncart && (
            <Button type="small" onClick={addItemHandler}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
