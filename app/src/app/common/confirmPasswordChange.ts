import api from "@/app/common/api";
import { ENDPOINT_USERS } from "@/app/common/routes";

export const confirmPasswordChange = async (email: string) => {
  try {
    const putRes = api.post(ENDPOINT_USERS, {});
  } catch (e) {
    console.log(e);
  }
};
