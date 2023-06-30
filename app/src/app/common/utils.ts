export enum EUserRole {
    SELLER,
    USER,
    INTERNAL,
  }

export const getCookie = (key : string) => {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
  }