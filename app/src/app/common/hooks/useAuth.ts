import { useRouter } from "next/navigation";

const useAuth = () => {
  const router = useRouter();

  const redirectOnNotAuth = () => {
    router.push("/login");
  };

  return {
    redirectOnNotAuth,
  };
};

export default useAuth;
