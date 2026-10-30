import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderwithProvider } from "../../test/utils";
import UpdateQuantity from "./UpdateQuantity";
import type { cartItem } from "./CartSlice";

const margherita: cartItem = {
  pizzaId: "1",
  name: "Margherita",
  quantity: 2,
  unitPrice: 10,
  totalPrice: 20,
};

function renderUpdateQuantity(item: cartItem = margherita) {
  return renderwithProvider(
    <UpdateQuantity pizzaId={item.pizzaId} currentQuantity={item.quantity} />,
    { preloadedState: { cartStore: { cart: [item] } } },
  );
}

describe("UpdateQuantity", () => {
  it("shows the current quantity", () => {
    renderUpdateQuantity();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("increments the item in the store when + is clicked", async () => {
    const user = userEvent.setup();
    const { store } = renderUpdateQuantity();

    await user.click(screen.getByRole("button", { name: "+" }));

    const updated = store.getState().cartStore.cart[0];
    expect(updated.quantity).toBe(3);
    expect(updated.totalPrice).toBe(30);
  });

  it("decrements the item in the store when - is clicked", async () => {
    const user = userEvent.setup();
    const { store } = renderUpdateQuantity();

    await user.click(screen.getByRole("button", { name: "-" }));

    const updated = store.getState().cartStore.cart[0];
    expect(updated.quantity).toBe(1);
    expect(updated.totalPrice).toBe(10);
  });

  it("removes the item from the store when - is clicked at quantity 1", async () => {
    const user = userEvent.setup();
    const single = { ...margherita, quantity: 1, totalPrice: 10 };
    const { store } = renderUpdateQuantity(single);

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(store.getState().cartStore.cart).toHaveLength(0);
  });
});
