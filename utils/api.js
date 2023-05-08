import { API_URL, STRAPI_API_TOKEN } from "./usefullConsts";
 
export const featchDataFromApi = async (endpoint) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${STRAPI_API_TOKEN}`);

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const res = await fetch(`${API_URL}${endpoint}`, requestOptions);
  const data = await res.json();

  return data;
};

export const makePaymentRequest = async (endpoint, payload) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${STRAPI_API_TOKEN}`);
  myHeaders.append("Content-type", "application/json");

  const res = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};
