import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '@/pages/login';
import Quiz from '@/pages/quiz';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from "@/components/ui/toaster"

type RouteType = {
  path: string;
  component: React.FC;
  protected?: boolean;
};

const routeList: RouteType[] = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Quiz,
    protected: true,
  },
];

function App() {
  return (
    <AuthProvider>
      <Toaster />
      <Router>
        <Routes>
          {routeList.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.protected ? (
                  <ProtectedRoute>
                    <route.component />
                  </ProtectedRoute>
                ) : (
                  <route.component />
                )
              }
            />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
