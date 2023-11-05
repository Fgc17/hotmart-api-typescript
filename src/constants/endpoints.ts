import { Endpoints } from "../types/Endpoints";

export const endpoints: Endpoints = {
  membersArea: {
    getModules: {
      url: "club/api/v1/modules?subdomain=:subdomain&is_extra=:is_extra",
      method: "get",
    },
    getPages: {
      url: `club/api/v1/modules/:module_id/pages`,
      method: "get",
    },
    getStudents: {
      url: "club/api/v1/users",
      method: "get",
    },
  },
  authentication: {
    getAccessObject: {
      baseURL: "https://api-sec-vlc.hotmart.com",
      url: "security/oauth/token",
      method: "post",
    },
  },
  subscriptions: {
    get: {
      url: "payments/api/v1/subscriptions",
      method: "get",
    },
  },
  sales: {
    get: {
      url: "payments/api/v1/sales/history",
      method: "get",
    },
  },
  unnoficial: {
    getAllProductsByAccount: {
      method: "get",
      url: "https://api-content-platform-space-gateway.cp.hotmart.com/rest/public/v1/products/:account_name/sale",
    },
    getSubdomainByProductId: {
      method: "get",
      url: "https://club-api.hotmart.com/hot-club-api/rest/v3/membership/subdomain/:productId",
    },
  },
};
