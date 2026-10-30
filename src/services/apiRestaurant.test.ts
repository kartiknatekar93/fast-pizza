import { describe, it, expect, vi, afterEach } from "vitest";
import {
  getMenu,
  getOrder,
  createOrder,
  updateOrder,
  type NewOrder,
} from "./apiRestaurant";

const API_URL = "https://react-fast-pizza-api.jonas.io/api";

// Replaces global fetch with a fake that resolves to a response-like object.
function mockFetch({ ok, data }: { ok: boolean; data?: unknown }) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok,
    json: async () => ({ data }),
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals(); // restore the real fetch after every test
});

const newOrder: NewOrder = {
  customer: "Kartik",
  phone: "9999999999",
  address: "Hyderabad",
  priority: false,
  cart: [
    {
      pizzaId: "1",
      name: "Margherita",
      quantity: 2,
      unitPrice: 10,
      totalPrice: 20,
    },
  ],
};

describe("getMenu", () => {
  it("calls the menu endpoint and returns the data", async () => {
    const menu = [{ id: 1, name: "Margherita" }];
    const fetchMock = mockFetch({ ok: true, data: menu });

    const result = await getMenu();

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/menu`);
    expect(result).toEqual(menu);
  });

  it("throws when the response is not ok", async () => {
    mockFetch({ ok: false });
    await expect(getMenu()).rejects.toThrow("Failed getting menu");
  });
});

describe("getOrder", () => {
  it("calls the order endpoint with the id and returns the data", async () => {
    const order = { id: "ABC123" };
    const fetchMock = mockFetch({ ok: true, data: order });

    const result = await getOrder("ABC123");

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/order/ABC123`);
    expect(result).toEqual(order);
  });

  it("throws a message containing the id when the order is not found", async () => {
    mockFetch({ ok: false });
    await expect(getOrder("NOPE")).rejects.toThrow("Couldn't find order #NOPE");
  });
});

describe("createOrder", () => {
  it("POSTs the order as JSON and returns the created order", async () => {
    const created = { id: "XYZ789" };
    const fetchMock = mockFetch({ ok: true, data: created });

    const result = await createOrder(newOrder);

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: { "Content-Type": "application/json" },
    });
    expect(result).toEqual(created);
  });

  it("throws a friendly message when the response is not ok", async () => {
    mockFetch({ ok: false });
    await expect(createOrder(newOrder)).rejects.toThrow(
      "Failed creating your order",
    );
  });

  it("throws the same friendly message on a network failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new TypeError("Failed to fetch")),
    );
    await expect(createOrder(newOrder)).rejects.toThrow(
      "Failed creating your order",
    );
  });
});

describe("updateOrder", () => {
  it("PATCHes the order with the update and returns nothing", async () => {
    const fetchMock = mockFetch({ ok: true });

    const result = await updateOrder("ABC123", { priority: true });

    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/order/ABC123`, {
      method: "PATCH",
      body: JSON.stringify({ priority: true }),
      headers: { "Content-Type": "application/json" },
    });
    expect(result).toBeUndefined();
  });

  it("throws a friendly message when the response is not ok", async () => {
    mockFetch({ ok: false });
    await expect(updateOrder("ABC123", { priority: true })).rejects.toThrow(
      "Failed updating your order",
    );
  });
});
