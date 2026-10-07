import { useFetcher, type ActionFunctionArgs } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }: ActionFunctionArgs) {
  const orderID = params.orderID;
  if (!orderID) throw new Error("Order ID is required");
  const data = { priority: true };
  await updateOrder(orderID, data);
  return null;
}
