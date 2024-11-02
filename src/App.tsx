
import router from "./router/index.tsx";
import ProtectedRoute from "./router/ProtectedRoute.tsx";

const App = () => {
  return (
      <ProtectedRoute router={router} />
  );
};

export default App;
