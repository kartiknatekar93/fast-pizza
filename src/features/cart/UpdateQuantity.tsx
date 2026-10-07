import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decrementItemQuantity, incrementItemQuantity } from "./CartSlice";

interface UpdateQuantityProps {
  pizzaId: string;
  currentQuantity: number;
}

function UpdateQuantity({ pizzaId, currentQuantity }: UpdateQuantityProps) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decrementItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(incrementItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}
export default UpdateQuantity;
