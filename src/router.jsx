import React from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Layout global overlays
import { Toast } from './components/layout/Toast';
import { AgriTranslateModal } from './components/ui/AgriTranslateModal';

// Auth Pages
import { LoginPage } from './pages/auth/Login';
import { RegisterPage } from './pages/auth/Register';

// Onboarding
import { OnboardingWizard } from './pages/onboarding/OnboardingWizard';

// Farmer
import { FarmerDashboard } from './pages/farmer/Dashboard';
import { FarmerProfile } from './pages/farmer/Profile';
import { FarmerMarketplace } from './pages/farmer/Marketplace';
import { ProductDetail } from './pages/farmer/ProductDetail';
import { SellProduct } from './pages/farmer/SellProduct';
import { FarmerCertifications } from './pages/farmer/Certifications';
import { FarmerNews } from './pages/farmer/News';
import { FarmerAlerts } from './pages/farmer/Alerts';
import { CropIntelligence } from './pages/farmer/CropIntelligence';
import { MarketPrices } from './pages/farmer/MarketPrices';
import { FarmerSchemes } from './pages/farmer/Schemes';
import { FarmerWater } from './pages/farmer/Water';

// Buyer
import { BuyerMarketplace } from './pages/buyer/BuyerMarketplace';
import { OrderTracking } from './pages/buyer/OrderTracking';

// Authority
import { AuthorityDashboard } from './pages/authority/AuthorityDashboard';
import { CertificationReview } from './pages/authority/CertificationReview';
import { PublishAlert } from './pages/authority/PublishAlert';
import { AuthoritySchemeManagement } from './pages/authority/SchemeManagement';
import { AuthorityWaterQueue } from './pages/authority/WaterRequestQueue';
import { AuthorityAuditLog } from './pages/authority/AuditLog';

// Admin
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUserManagement } from './pages/admin/UserManagement';
import { MarketplaceModeration } from './pages/admin/MarketplaceModeration';
import { ContentManagement } from './pages/admin/ContentManagement';
import { PlatformConfiguration } from './pages/admin/PlatformConfiguration';
import { SystemMonitoring } from './pages/admin/SystemMonitoring';

const getRoleHomeRoute = (role) => {
  switch (role) {
    case 'buyer':
      return '/buyer/marketplace';
    case 'authority':
      return '/authority/dashboard';
    case 'admin':
      return '/admin/dashboard';
    case 'farmer':
    default:
      return '/farmer/dashboard';
  }
};

const RootRedirect = () => {
  const { isAuthenticated, role } = useApp();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getRoleHomeRoute(role)} replace />;
};

const PublicOnlyRoute = () => {
  const { isAuthenticated, role } = useApp();
  if (isAuthenticated) {
    return <Navigate to={getRoleHomeRoute(role)} replace />;
  }
  return <Outlet />;
};

const RoleProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useApp();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={getRoleHomeRoute(role)} replace />;
  }

  return <Outlet />;
};

const AppErrorBoundary = () => {
  const { isAuthenticated, role } = useApp();
  const fallbackUrl = isAuthenticated ? getRoleHomeRoute(role) : '/login';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#F6F1E6',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #E7DFCE',
        borderRadius: '16px',
        padding: '32px',
        maxWidth: '480px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.06)'
      }}>
        <h2 style={{ color: '#1B4332', fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
          AgriConnect Navigation
        </h2>
        <p style={{ color: '#6B6355', fontSize: '14px', marginBottom: '20px' }}>
          Something unexpected happened while loading this screen.
        </p>
        <a
          href={fallbackUrl}
          style={{
            display: 'inline-block',
            backgroundColor: '#1B4332',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            textDecoration: 'none'
          }}
        >
          Return to Dashboard →
        </a>
      </div>
    </div>
  );
};

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toast />
      <AgriTranslateModal />
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <AppErrorBoundary />,
    children: [
      {
        path: '/',
        element: <RootRedirect />
      },
      {
        path: '/dashboard',
        element: <RootRedirect />
      },

      // Auth Routes (Public only — redirect to dashboard if logged in)
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            path: '/login',
            element: <LoginPage />
          },
          {
            path: '/auth/login',
            element: <LoginPage />
          },
          {
            path: '/register',
            element: <RegisterPage />
          },
          {
            path: '/auth/register',
            element: <RegisterPage />
          }
        ]
      },

      // Farmer Protected Routes
      {
        element: <RoleProtectedRoute allowedRoles={['farmer']} />,
        children: [
          {
            path: '/onboarding',
            element: <Navigate to="/onboarding/2" replace />
          },
          {
            path: '/onboarding/:step',
            element: <OnboardingWizard />
          },
          {
            path: '/farmer/dashboard',
            element: <FarmerDashboard />
          },
          {
            path: '/farmer/profile',
            element: <FarmerProfile />
          },
          {
            path: '/farmer/marketplace',
            element: <FarmerMarketplace />
          },
          {
            path: '/farmer/marketplace/sell',
            element: <SellProduct />
          },
          {
            path: '/farmer/certification',
            element: <FarmerCertifications />
          },
          {
            path: '/farmer/certifications',
            element: <FarmerCertifications />
          },
          {
            path: '/farmer/news',
            element: <FarmerNews />
          },
          {
            path: '/farmer/advisories',
            element: <Navigate to="/farmer/certifications" replace />
          },
          {
            path: '/farmer/alerts',
            element: <FarmerAlerts />
          },
          {
            path: '/farmer/intelligence',
            element: <CropIntelligence />
          },
          {
            path: '/farmer/market',
            element: <MarketPrices />
          },
          {
            path: '/farmer/schemes',
            element: <FarmerSchemes />
          },
          {
            path: '/farmer/water',
            element: <FarmerWater />
          }
        ]
      },

      // Buyer Protected Routes
      {
        element: <RoleProtectedRoute allowedRoles={['buyer']} />,
        children: [
          {
            path: '/buyer/marketplace',
            element: <BuyerMarketplace />
          },
          {
            path: '/buyer/orders/:id',
            element: <OrderTracking />
          },
          {
            path: '/buyer/saved',
            element: <BuyerMarketplace />
          }
        ]
      },

      // Authority Protected Routes
      {
        element: <RoleProtectedRoute allowedRoles={['authority']} />,
        children: [
          {
            path: '/authority/dashboard',
            element: <AuthorityDashboard />
          },
          {
            path: '/authority/certifications/:id',
            element: <CertificationReview />
          },
          {
            path: '/authority/alerts/publish',
            element: <PublishAlert />
          },
          {
            path: '/authority/schemes',
            element: <AuthoritySchemeManagement />
          },
          {
            path: '/authority/water-requests',
            element: <AuthorityWaterQueue />
          },
          {
            path: '/authority/audit-log',
            element: <AuthorityAuditLog />
          }
        ]
      },

      // Admin Protected Routes
      {
        element: <RoleProtectedRoute allowedRoles={['admin']} />,
        children: [
          {
            path: '/admin/dashboard',
            element: <AdminDashboard />
          },
          {
            path: '/admin/users',
            element: <AdminUserManagement />
          },
          {
            path: '/admin/moderation',
            element: <MarketplaceModeration />
          },
          {
            path: '/admin/content',
            element: <ContentManagement />
          },
          {
            path: '/admin/config',
            element: <PlatformConfiguration />
          },
          {
            path: '/admin/monitoring',
            element: <SystemMonitoring />
          }
        ]
      },

      // Shared Authenticated Routes
      {
        element: <RoleProtectedRoute allowedRoles={['farmer', 'buyer', 'authority', 'admin']} />,
        children: [
          {
            path: '/marketplace/product/:id',
            element: <ProductDetail />
          }
        ]
      },

      // Informational links fallback
      {
        path: '/help',
        element: <RootRedirect />
      },
      {
        path: '/contact',
        element: <RootRedirect />
      },
      {
        path: '/privacy',
        element: <RootRedirect />
      },
      {
        path: '/terms',
        element: <RootRedirect />
      },

      // Catch-all
      {
        path: '*',
        element: <RootRedirect />
      }
    ]
  }
]);
