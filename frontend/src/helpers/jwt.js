import jwt_decode from "jwt-decode";
import { isEmpty } from "lodash";

const getUserDetailsFromToken = (token) => {
  if (!token) {
    return {};
  }
  const userData = jwt_decode(token);
  console.log(userData);
  if (userData && isEmpty(userData)) {
    return {};
  }
  return userData;
};

export default getUserDetailsFromToken;
