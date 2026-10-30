import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderwithProvider } from "../../test/utils";
import { formatCurrency } from "../../utils/helpers";
import CartItem from "./CartItem";
import type { cartItem } from "./CartSlice";

const margherita: cartItem = {
  pizzaId: "1",
  name: "Margherita",
  quantity: 2,
  unitPrice: 10,
  totalPrice: 20,
};

function renderCartItem() {
  return renderwithProvider(
    <ul>
      <CartItem item={margherita} />
    </ul>,
    { preloadedState: { cartStore: { cart: [margherita] } } },
  );
}

describe("CartItem", () => {
  it("shows the quantity and name", () => {
    renderCartItem();
    expect(screen.getByText("2\u00d7 Margherita")).toBeInTheDocument();
  });

  it("shows the formatted total price", () => {
    renderCartItem();
    expect(screen.getByText(formatCurrency(20))).toBeInTheDocument();
  });

  it("passes the quantity from the store to the quantity controls", () => {
    renderCartItem();
    // the <span> in UpdateQuantity shows currentQuantity, read from the store
    expect(screen.getByText("2", { selector: "span" })).toBeInTheDocument();
  });

  it("renders the quantity and delete controls", () => {
    renderCartItem();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument(); // adjust once I see DeleteItem
  });
});
