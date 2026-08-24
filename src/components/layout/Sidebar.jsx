import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Tractor,
  LayoutDashboard,
  MapPinned,
  Sprout,
  TrendingUp,
  FileText,
  Droplet,
  ShoppingCart,
  Newspaper,
  ClipboardList,
  AlertTriangle,
  User,
  BadgeCheck,
  History,
  Languages
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ collapsed = false }) => {
  const { role, farmer, t, openTranslator } = useApp();
  const location = useLocation();

  const getNavItems = () => {
    switch (role) {
      case 'buyer':
        return [
          { name: 'Marketplace', path: '/buyer/marketplace', icon: ShoppingCart },
          { name: 'Orders', path: '/buyer/orders/AC-8492-MK', icon: ClipboardList },
          { name: 'Saved Products', path: '/buyer/saved', icon: FileText }
        ];
      case 'authority':
        return [
          { name: 'Dashboard', path: '/authority/dashboard', icon: LayoutDashboard },
          { name: 'Certification Review', path: '/authority/certifications/DOC-8892-REV', icon: BadgeCheck },
          { name: 'Scheme Management', path: '/authority/schemes', icon: FileText },
          { name: 'Water Requests', path: '/authority/water-requests', icon: Droplet },
          { name: 'Announcements & Alerts', path: '/authority/alerts/publish', icon: AlertTriangle },
          { name: 'Audit Log', path: '/authority/audit-log', icon: History }
        ];
      case 'admin':
        return [
          { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'User Management', path: '/admin/users', icon: User },
          { name: 'Marketplace Moderation', path: '/admin/moderation', icon: ShoppingCart },
          { name: 'Content Management', path: '/admin/content', icon: Newspaper },
          { name: 'Platform Configuration', path: '/admin/config', icon: FileText },
          { name: 'System Monitoring', path: '/admin/monitoring', icon: TrendingUp }
        ];
      case 'farmer':
      default:
        return [
          { name: 'Dashboard', path: '/farmer/dashboard', icon: LayoutDashboard },
          { name: 'My Farm', path: '/farmer/profile', icon: MapPinned },
          { name: 'Crop Intelligence', path: '/farmer/intelligence', icon: Sprout },
          { name: 'Market Prices', path: '/farmer/market', icon: TrendingUp },
          { name: 'Schemes', path: '/farmer/schemes', icon: FileText },
          { name: 'Water', path: '/farmer/water', icon: Droplet },
          { name: 'Marketplace', path: '/farmer/marketplace', icon: ShoppingCart },
          { name: 'Agriculture News', path: '/farmer/news', icon: Newspaper },
          { name: 'Advisories', path: '/farmer/advisories', icon: ClipboardList },
          { name: 'Alerts', path: '/farmer/alerts', icon: AlertTriangle }
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''}`}>
      <div>
        <Link to="/" className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Tractor size={20} strokeWidth={2} />
          </div>
          {!collapsed && (
            <div className="sidebar-brand-text">
              <span className="sidebar-brand-title">
                AgriConnect
              </span>
              <span className="sidebar-brand-sub">Digital Stewardship</span>
            </div>
          )}
        </Link>

        <nav className="sidebar-nav" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = location.pathname.startsWith(item.path);
            const translatedName = t(item.name, item.name);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `sidebar-nav-item ${isActive || isItemActive ? 'is-active' : ''}`
                }
                title={translatedName}
              >
                <Icon size={18} />
                {!collapsed && <span>{translatedName}</span>}
              </NavLink>
            );
          })}

          {/* Quick Translator Action in Sidebar */}
          <button
            type="button"
            className="sidebar-nav-item"
            style={{
              background: 'transparent',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              cursor: 'pointer'
            }}
            onClick={() => openTranslator('')}
            title={t('AgriTranslate', 'AgriTranslate')}
          >
            <Languages size={18} color="var(--color-primary)" />
            {!collapsed && <span>{t('AgriTranslate', 'AgriTranslate')}</span>}
          </button>
        </nav>
      </div>

      <div className="sidebar-footer-nav">
        <NavLink
          to="/farmer/profile"
          className={({ isActive }) =>
            `sidebar-nav-item ${isActive ? 'is-active' : ''}`
          }
          title={farmer.name || t('Profile', 'Profile')}
        >
          <User size={18} />
          {!collapsed && <span>{t('Profile', 'Profile')}</span>}
        </NavLink>
      </div>
    </aside>
  );
};
