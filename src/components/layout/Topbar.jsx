import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Bell, Languages, ChevronDown, Check, Menu, LogOut } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../ui/Avatar';

export const Topbar = ({ title, simplified = false, showAvatar = true }) => {
  const {
    role,
    langCode,
    currentLanguage,
    availableLanguages,
    setLanguage,
    openTranslator,
    t,
    alerts,
    farmer,
    showToast,
    toggleMobileMenu,
    isAuthenticated,
    currentUser,
    logoutUser
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unreadAlertsCount =
    alerts.priorityAlerts.filter(a => !a.read).length +
    alerts.weatherUpdates.filter(w => !w.read).length +
    alerts.marketShifts.filter(m => !m.read).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (code, name, native) => {
    setLanguage(code);
    setIsLangDropdownOpen(false);
    showToast(`Language switched to ${native} (${name})`, 'success');
  };

  const getAlertsRoute = () => {
    switch (role) {
      case 'buyer':
        return '/buyer/orders/AC-8492-MK';
      case 'authority':
        return '/authority/alerts/publish';
      case 'admin':
        return '/admin/monitoring';
      case 'farmer':
      default:
        return '/farmer/alerts';
    }
  };

  const getProfileRoute = () => {
    switch (role) {
      case 'buyer':
        return '/buyer/marketplace';
      case 'authority':
        return '/authority/dashboard';
      case 'admin':
        return '/admin/users';
      case 'farmer':
      default:
        return '/farmer/profile';
    }
  };

  const displayName = currentUser?.name || (role === 'farmer' ? farmer.name : `${role.toUpperCase()} User`);

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          type="button"
          className="mobile-menu-toggle-btn"
          onClick={toggleMobileMenu}
          aria-label="Open Navigation Menu"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        {title && <h2 className="topbar-title">{t(title, title)}</h2>}
      </div>

      <div className="topbar-right">
        {/* Active Role Badge */}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: role === 'farmer' ? '#dcfce7' : role === 'buyer' ? '#e0f2fe' : role === 'authority' ? '#fef3c7' : '#f3e8ff',
            color: role === 'farmer' ? '#15803d' : role === 'buyer' ? '#0369a1' : role === 'authority' ? '#b45309' : '#7c3aed'
          }}
        >
          {role}
        </span>

        {/* Quick AgriTranslate Tool Button */}
        <button
          type="button"
          onClick={() => openTranslator('')}
          className="language-btn"
          style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', color: '#15803d' }}
          title="Open AgriTranslate Tool"
        >
          <Languages size={15} />
          <span>AgriTranslate</span>
        </button>

        {/* Multi-Language Dropdown Switcher */}
        <div className="language-dropdown-wrapper" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            className="language-btn"
            title="Choose Regional Language"
            aria-expanded={isLangDropdownOpen}
          >
            <Globe size={15} />
            <span>{currentLanguage.flag} {currentLanguage.native}</span>
            <ChevronDown size={13} style={{ opacity: 0.7 }} />
          </button>

          {isLangDropdownOpen && (
            <div className="language-dropdown-menu">
              <div className="language-dropdown-header">Select Language / भाषा चुनें</div>
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  className={`language-option-btn ${langCode === lang.code ? 'is-active' : ''}`}
                  onClick={() => handleSelectLanguage(lang.code, lang.name, lang.native)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{lang.flag}</span>
                    <span>{lang.native} ({lang.name})</span>
                  </span>
                  {langCode === lang.code && <Check size={14} color="#15803d" />}
                </button>
              ))}

              <div className="language-translate-action">
                <button
                  type="button"
                  className="open-translator-btn"
                  onClick={() => {
                    setIsLangDropdownOpen(false);
                    openTranslator('');
                  }}
                >
                  <Languages size={15} />
                  <span>Translate Text & Speech</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notifications / Alerts */}
        <Link
          to={getAlertsRoute()}
          className="topbar-icon-btn"
          title="Alert Center"
          aria-label="Alerts"
        >
          <Bell size={18} />
          {unreadAlertsCount > 0 && <span className="topbar-badge-count" />}
        </Link>

        {/* Profile Avatar / Link */}
        {showAvatar && !simplified && (
          <Link to={getProfileRoute()} style={{ display: 'inline-flex' }} title={displayName}>
            <Avatar src={role === 'farmer' ? (farmer.avatarUrl || '/farmer.png') : undefined} name={displayName} size="sm" />
          </Link>
        )}

        {/* Log Out Button */}
        {isAuthenticated && (
          <button
            type="button"
            onClick={logoutUser}
            className="topbar-logout-btn"
            title="Sign Out"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <LogOut size={14} />
            <span>{t('Logout', 'Log Out')}</span>
          </button>
        )}
      </div>
    </header>
  );
};
