import { redirect } from "next/navigation";
import { PATH } from "./_shared/paths";

const fetchClient = async (url: string, options: RequestInit = {}) => {
  let token;
  if (process.env.NODE_ENV === "development") {
    token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  } else {
    token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
  }

  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, mergedOptions);
  // 통신 에러
  if (!response.ok) {
    switch (response.status) {
      case 403:
        redirect(PATH.LOGIN);
      default:
        throw new Error(`${response.status} ${response.statusText}`);
    }
  } else {
    const data = await response.json();
    return data;
  }
};

export default fetchClient;
