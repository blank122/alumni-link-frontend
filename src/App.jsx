import { AuthProvider } from "./contexts/AuthContexts";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
