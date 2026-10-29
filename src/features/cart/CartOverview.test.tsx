import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderwithProvider } from "../../test/utils";
import { formatCurrency } from "../../utils/helpers";
import CartOverview from "./CartOverview";
import type { cartItem } from "./CartSlice";

const margherita: cartItem = {
  pizzaId: "1",
  name: "Margherita",
  quantity: 2,
  unitPrice: 10,
  totalPrice: 20,
};

const pepperoni: cartItem = {
  pizzaId: "2",
  name: "Pepperoni",
  quantity: 1,
  unitPrice: 15,
  totalPrice: 15,
};

describe("CartOverview", () => {
  it("renders nothing when the cart is empty", () => {
    const { container } = renderwithProvider(<CartOverview />);
    expect(container.innerHTML).toBe("");
  });

  it("shows the number of pizzas and the formatted prices", () => {
    renderwithProvider(<CartOverview />, {
      preloadedState: { cartStore: { cart: [margherita, pepperoni] } },
    });

    expect(screen.getByText("2 Pizza")).toBeInTheDocument();
    expect(screen.getByText(formatCurrency(35))).toBeInTheDocument();
  });
  it("has a link that opens the cart page", () => {
    renderwithProvider(<CartOverview />, {
      preloadedState: { cartStore: { cart: [margherita] } },
    });
    const link = screen.getByRole("link", { name: /open cart/i });
    expect(link).toHaveAttribute("href", "/cart");
  });
});
