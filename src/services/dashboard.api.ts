import axios from "axios";

export async function getSurveyAndRecommendedDong(userId: number) {
  const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/history/${userId}`);

  return response.data;
}

// 지도 관련 API---------------------
export const getLatLngFromKeyword = (keyword: string): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve, reject) => {
    kakao.maps.load(() => {
      if (!kakao.maps.services) {
        return reject(new Error("services 라이브러리를 불러오지 못했습니다."));
      }

      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(keyword, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve({
            lat: parseFloat(data[0].y),
            lng: parseFloat(data[0].x),
          });
        } else {
          reject(new Error(`"${keyword}"에 대한 장소를 찾을 수 없습니다.`));
        }
      });
    });
  });
};
