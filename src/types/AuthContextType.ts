import RegisterType from "./RegisterType";
import LoginType from "./LoginType";

export default interface AuthContextType {
  login: (data: LoginType) => Promise<void>;
  logout: () => void;
  register: (data: RegisterType) => Promise<void>;
}
