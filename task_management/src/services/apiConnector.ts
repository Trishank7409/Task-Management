import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base URL using environment variables
const BASE_URL: string = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Define the types for the `apiConnector` function
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // Add more methods as needed

export const apiConnector = async <T>(
  method: HttpMethod,
  url: string,
  bodyData?: Record<string, any>, // You can replace this with a more specific type if needed
  headers?: Record<string, string>,
  params?: Record<string, any>,
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data: bodyData || undefined,
    headers: headers || undefined,
    params: params || undefined,
  };

  try {
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    // Handle errors properly here if needed
    throw error;
  }
};