"use client";

import { useState, useCallback } from "react";

// ----------------------------
// Types
// ----------------------------
export interface ShippingAddress {
  id: number;
  full_name: string;
  phone_number: string;
  email?: string;
  country: string;
  city: string;
  postal_code?: string;
  street_address: string;
  landmark?: string;
  is_default: boolean;
  created_at: string;
}

export interface ShippingMethod {
  id: number;
  name: string;
  description?: string;
  base_cost: string;
  cost_per_km: string;
  estimated_days: number;
  is_active: boolean;
}

export interface ShipmentHistory {
  id: number;
  old_status?: string;
  new_status: string;
  changed_at: string;
  note?: string;
}

export interface Shipment {
  id: number;
  order: number;
  address: ShippingAddress;
  method?: ShippingMethod;
  courier_name?: string;
  tracking_number?: string;
  status: string;
  shipped_at?: string;
  delivered_at?: string;
  created_at: string;
  history: ShipmentHistory[];
}

// ----------------------------
// Hook
// ----------------------------
export function useShipping() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generic request helper
  const request = useCallback(
    async <T = any>(url: string, options: RequestInit = {}): Promise<T> => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, {
          ...options,
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        return data;
      } catch (err: any) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // ----------------------------
  // Addresses
  // ----------------------------
  const getAddresses = useCallback((): Promise<ShippingAddress[]> => {
    return request("/api/shipping/addresses/");
  }, [request]);

  const createAddress = useCallback(
    (address: Partial<ShippingAddress>): Promise<ShippingAddress> => {
      return request("/api/shipping/addresses/", {
        method: "POST",
        body: JSON.stringify(address),
      });
    },
    [request]
  );

  const updateAddress = useCallback(
    (id: number, address: Partial<ShippingAddress>): Promise<ShippingAddress> => {
      return request(`/api/shipping/addresses/${id}/`, {
        method: "PUT",
        body: JSON.stringify(address),
      });
    },
    [request]
  );

  const deleteAddress = useCallback((id: number): Promise<void> => {
    return request(`/api/shipping/addresses/${id}/`, { method: "DELETE" });
  }, [request]);

  const setDefaultAddress = useCallback((id: number): Promise<void> => {
    return request(`/api/shipping/addresses/${id}/set_default/`, { method: "POST" });
  }, [request]);

  // ----------------------------
  // Shipping Methods
  // ----------------------------
  const getShippingMethods = useCallback((): Promise<ShippingMethod[]> => {
    return request("/api/shipping/methods/");
  }, [request]);

  // ----------------------------
  // Shipments
  // ----------------------------
  const getShipments = useCallback((): Promise<Shipment[]> => {
    return request("/api/shipping/shipments/");
  }, [request]);

  const getShipment = useCallback((id: number): Promise<Shipment> => {
    return request(`/api/shipping/shipments/${id}/`);
  }, [request]);

  const trackShipmentHistory = useCallback(
    (shipmentId: number): Promise<ShipmentHistory[]> => {
      return request(`/api/shipping/shipments/${shipmentId}/history/`);
    },
    [request]
  );

  return {
    loading,
    error,
    // Addresses
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    // Methods
    getShippingMethods,
    // Shipments
    getShipments,
    getShipment,
    trackShipmentHistory,
  };
}
