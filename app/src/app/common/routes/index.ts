export enum EAuthenticatedRoutes {
  ROUTE_SELLERS = "/sellers",
  ROUTE_PRODUCTS = "/products",
  ROUTE_HOME = "/",
  ROUTE_LOGIN = "/login",
}

export const ENDPOINT_AUTH = "/auth/login";
export const ENDPOINT_PRODUCTS = "/products";
export const ENDPOINT_USERS = "/users";

export const endpointPutProductName = (product_id: string) =>
  `${ENDPOINT_PRODUCTS}/${product_id}/name`;
