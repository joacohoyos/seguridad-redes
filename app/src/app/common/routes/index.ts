export const ENDPOINT_AUTH = "/auth/login";
export const ENDPOINT_PRODUCTS = "/products";
export const ENDPOINT_USERS = "/users";

export const endpointPutProductName = (product_id: string) =>
  `${ENDPOINT_PRODUCTS}/${product_id}/name`;

export const endpointChangePassword = (user_email: string) =>
  `${ENDPOINT_USERS}/${user_email}`;

export const endpointConfirmPasswordChange = (user_email: string) =>
`${ENDPOINT_USERS}/${user_email}/password`;
