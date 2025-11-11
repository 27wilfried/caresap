import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";
import { Navigate } from "react-router-dom";

const ShowOnLogin = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) {
    return children;
  }
  return null;
};
export const ShowOnLogout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
export default ShowOnLogin;

