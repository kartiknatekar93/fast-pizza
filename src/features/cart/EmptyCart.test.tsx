import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderwithProvider } from "../../test/utils";
import EmptyCart from "./EmptyCart";

describe("EmptyCart", () => {
  it("shows the empty cart message", () => {
    renderwithProvider(<EmptyCart />);
    expect(screen.getByText(/your cart is still empty/i)).toBeInTheDocument();
  });

  it("has a link back to the menu", () => {
    renderwithProvider(<EmptyCart />);

    const link = screen.getByRole("link", { name: /back to menu/i });
    expect(link).toHaveAttribute("href", "/menu");
  });
});
