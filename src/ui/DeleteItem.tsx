import { useDispatch } from "react-redux";
import { deleteItem } from "../features/cart/CartSlice";
import type { AppDispatch } from "../store";

interface DeleteItemProps {
  id: string;
}
function DeleteItem({ id }: DeleteItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    small: base + "px-4 py-2 md:px-5 md:py-2.5 text-xs",
  };
  return (
    <button
      className={styles["small"]}
      onClick={() => dispatch(deleteItem(id))}
    >
      Delete
    </button>
  );
}

export default DeleteItem;
