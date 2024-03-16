import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Loading from "./Loading";
import NotifiProvider from "../context/notificacionesContext";


export function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  //NOTA: descomentar cuando se tenga la sesión implementada
  //if (!user) return <Navigate to="/login" />;

  return <NotifiProvider>
  {children}
  </NotifiProvider>;
}