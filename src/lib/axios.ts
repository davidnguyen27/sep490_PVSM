import { AXIOS_CONFIG } from "@/config/axios.config";
import type { BaseResponse } from "@/shared/types/api.type";
import { getLoginPathByRole, isLoginRoute } from "@/shared/utils/auth.utils";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import axios, { AxiosError, type AxiosResponse } from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create(AXIOS_CONFIG);

// Request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<BaseResponse>) => {
    if (!error.response) {
      toast.error("Không thể kết nối đến máy chủ.");
      return Promise.reject({ message: "Không thể kết nối đến máy chủ." });
    }

    const { status, data, config } = error.response;

    switch (status) {
      case 401:
        if (isLoginRoute(config.url)) {
          toast.error(extractErrorMessage(error));
        } else {
          toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          localStorage.clear();
          window.location.href = getLoginPathByRole();
        }
        break;

      case 403:
        toast.error("Bạn không có quyền truy cập chức năng này.");
        break;

      case 500:
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
        break;

      default:
        if (data?.message) {
          toast.error(data.message);
        }
        break;
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
