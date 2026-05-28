import axios from "axios";

export async function getHistories() {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/historyTest`);

  return response;
}
