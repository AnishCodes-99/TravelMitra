import { HealthResponse, FlightItem, HotelItem, PackageItem } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

export class ApiError extends Error {
  public statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      let errorMsg = `API Error: ${res.statusText} (${res.status})`;
      try {
        const errorData = await res.json();
        if (errorData?.error?.message) {
          errorMsg = errorData.error.message;
        }
      } catch {
        // Fall back to default error message
      }
      throw new ApiError(errorMsg, res.status);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(`Network or connection error while contacting ${url}: ${(error as Error).message}`);
  }
}

export const api = {
  getHealth: async (): Promise<HealthResponse> => {
    return request<HealthResponse>('/health');
  },

  searchFlights: async (params: Record<string, string | number>): Promise<{ success: boolean; data: FlightItem[] }> => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ success: boolean; data: FlightItem[] }>(`/flights/search?${query}`);
  },

  searchHotels: async (params: Record<string, string | number>): Promise<{ success: boolean; data: HotelItem[] }> => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ success: boolean; data: HotelItem[] }>(`/hotels/search?${query}`);
  },

  searchPackages: async (params: Record<string, string | number>): Promise<{ success: boolean; data: PackageItem[] }> => {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ success: boolean; data: PackageItem[] }>(`/packages/search?${query}`);
  },
};
