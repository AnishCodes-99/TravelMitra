import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout/Layout';

// Pages
import { Home } from './pages/Home';
import { Flights } from './pages/Flights';
import { Hotels } from './pages/Hotels';
import { Packages } from './pages/Packages';
import { Destinations } from './pages/Destinations';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { MyTrips } from './pages/MyTrips';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Bookings } from './pages/Bookings';
import { Saved } from './pages/Saved';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Faq } from './pages/Faq';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="flights" element={<Flights />} />
              <Route path="hotels" element={<Hotels />} />
              <Route path="packages" element={<Packages />} />
              <Route path="destinations" element={<Destinations />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="my-trips" element={<MyTrips />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="saved" element={<Saved />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="faq" element={<Faq />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
