import { getData } from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchGraphData = createAsyncThunk("graph/fetchAll", async () => {
  try {
    const response = await getData(`${BASE_URL}/admin/dashboard`);

    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
});
