import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const base_url = "https://aiemailsender-4yl3v.sevalla.app";
// const base_url = "http://localhost:8000";
const base_url =
  import.meta.env.VITE_BACKEND_BASE_URL || "http://localhost:8000";

export const generateEmail = createAsyncThunk(
  "email/generate",
  async ({ prompt, recipients }) => {
    const resp = await axios.post(`${base_url}/api/generate`, {
      prompt,
      recipients,
    });
    return resp.data;
  }
);

export const sendEmail = createAsyncThunk(
  "email/send",
  async ({ subject, body, recipients }) => {
    const resp = await axios.post(`${base_url}/api/send`, {
      subject,
      body,
      recipients,
    });
    return resp.data;
  }
);
