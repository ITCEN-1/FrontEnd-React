import axios from "axios";

export async function getSurveyAndRecommendedDong(userId: number) {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/history/${userId}`);

  return response.data;
}
