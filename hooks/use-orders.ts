"use client";

import { useState } from "react";
import {
  getOrders as apiFetchOrders,
  getOrderById as apiFetchOrderById,
  cancelOrder as apiCancelOrder,
  createOrder as apiCreateOrder,
} from "@/lib/orders";

// ------------------ ORDER INTERFACE ------------------
export interface Order {
  id: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
  };
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// ------------------ HOOK ------------------
export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ------------------ Fetch all orders ------------------
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data: Order[] = await apiFetchOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching orders");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------ Fetch order by ID ------------------
  const fetchOrderById = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      return await apiFetchOrderById(id) as Order;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching order");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------ Cancel an order ------------------
  const cancelOrder = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await apiCancelOrder(id);
      await fetchOrders(); // refresh after cancel
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while cancelling order");
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------ Create new order ------------------
  const createOrder = async (payload: {
    cart_id: number;
    shipping_address_id: number;
    shipping_method_id: number;
    email: string;
    full_name: string;
    phone_number: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const newOrder: Order = await apiCreateOrder(payload);
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating order");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    cancelOrder,
    createOrder,
  };
}
