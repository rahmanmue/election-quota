import RegisterType from "./RegisterType";
import LoginType from "./LoginType";

export default interface AuthContextType {
  login: (data: LoginType) => void;
  logout: () => void;
  register: (data: RegisterType) => void;
}
