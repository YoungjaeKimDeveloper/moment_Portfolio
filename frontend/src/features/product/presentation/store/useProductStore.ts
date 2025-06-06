/* eslint-disable @typescript-eslint/no-explicit-any */
/*
  
  State Management 
  API <---> State management <---> UI
 
*/
import type Product from "../../domain/entity/product.ts";
import { create } from "zustand";
import ApiProduct from "../../data/apiProduct.ts";
import toast from "react-hot-toast";
import type ProductStore from "../../data/dto/productResponse.dto.ts.ts";
// Singleton
const apiProduct = new ApiProduct();

const useProductStore = create<ProductStore>()((set, get) => ({
  // States
  // Data
  data: [] as Product[],
  // Statement
  isLoading: false,
  // Messages
  errorMessage: "",

  // Actions
  // Actions - R
  fetchAllProducts: async () => {
    try {
      set({ isLoading: true, errorMessage: "" });
      const products = await apiProduct.fetchAllProducts();

      if (products == null) {
        set({ data: [] });
      } else {
        set({ data: products });
      }
    } catch (error: any) {
      set({
        errorMessage: `Failed to fetch all products ${error.message ?? " "}`,
      });
    } finally {
      set({ isLoading: false });
    }
  },
  // Actions - C
  createProduct: async (title: string, price: number, image_url: string) => {
    try {
      set({ isLoading: true, errorMessage: "" });
      await apiProduct.createProduct(title, price, image_url);
      toast.success("Created ✅");
    } catch (error: any) {
      set({
        errorMessage: `ERROR IN CREATING NEW PRODUCT ${error.message || ""}`,
      });
      toast.error(`ERROR IN CREATING NEW PRODUCT ${error.message || ""}`);
    } finally {
      set({ isLoading: false });
    }
  },

  // Actions - U
  updateSingleProduct: async (
    id: string,
    title: string,
    price: number,
    image_url: string
  ) => {
    console.log("function called");
    try {
      set({ isLoading: true, errorMessage: "" });
      await apiProduct.updateSingleProduct(id, title, price, image_url);
      toast.success("Updated ✅");
    } catch (error: any) {
      set({
        errorMessage: `Failed to fetch all products ${error.message ?? " "}`,
      });
      toast.error("Failed to updateSingleProduct a product❌");
    } finally {
      set({ isLoading: false });
    }
  },
  // Actions - D
  deleteSingleProduct: async (id: string) => {
    try {
      set({ isLoading: true, errorMessage: "" });
      await apiProduct.deleteSingleProduct(id);
      toast.success("Deleted ✅");
    } catch (error: any) {
      set({
        errorMessage: `Failed to fetch all products ${error.message ?? " "}`,
      });
      toast.error("Failed to delete a product❌");
    } finally {
      set({ isLoading: false });
    }
    get().fetchAllProducts();
  },
}));

export default useProductStore;
