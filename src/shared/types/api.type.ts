export interface BaseResponse<T> {
  code: number;
  success: boolean;
  message?: string;
  data?: T;
}

export interface BaseListResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: {
    pageInfo: {
      page: number;
      size: number;
      sort: string | null;
      order: string | null;
      totalPage: number;
      totalItem: number;
    };
    searchInfo: {
      keyWord?: string | null;
      role?: number | null;
      status?: boolean | null;
      is_Verify?: boolean | null;
      is_Delete?: boolean | null;
    };
    pageData: T[];
  };
}
