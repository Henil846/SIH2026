import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Sun,
  Sprout,
  TrendingUp,
  AlertTriangle,
  FileText,
  Droplets,
  ShoppingCart,
  ArrowRight,
  ShieldCheck,
  MapPinned,
  ChevronRight
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerDashboard = () => {
  const { farmer, alerts, advisories, showToast, t } = useApp();
  const navigate = useNavigate();

  return (
    <PageShell title={t('Farmer Dashboard', 'Farmer Dashboard')}>
      {/* Welcome Banner */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5) var(--space-6)',
        boxShadow: 'var(--shadow-card)',
        marginBottom: 'var(--space-6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-4)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>
              {t('Welcome back', 'Welcome back')}, {farmer.name}!
            </h1>
            <VoiceButton textToRead={`Welcome back, ${farmer.name}. Farm ID ${farmer.id}. Village Pratappur, District Ludhiana. Weather is clear with temperature 29 degrees Celsius.`} />
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginTop: '4px' }}>
            {farmer.village}, {farmer.district} · Farm ID: <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{farmer.id}</span>
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button
            variant="outline"
            size="sm"
            icon={MapPinned}
            onClick={() => navigate('/farmer/profile')}
          >
            {t('My Farm', 'My Farm')} (17.7 Acres)
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={ShoppingCart}
            onClick={() => navigate('/farmer/marketplace')}
          >
            {t('Browse Marketplace', 'Browse Marketplace')}
          </Button>
        </div>
      </div>

      {/* 3 Metric Cards Row */}
      <div className="grid-3" style={{ marginBottom: 'var(--space-6)' }}>
        {/* Weather & Soil */}
        <Card
          title={t('Agro-Climatic Weather', 'Agro-Climatic Weather')}
          icon={Sun}
          enableVoice
          voiceText="Weather overview: Sunny and dry, 29°C. Soil moisture 42%. Next rain forecasted in 5 days."
        >
          <div className="flex-between" style={{ marginBottom: 'var(--space-3)' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text)' }}>29°C</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Sunny & Clear · 42% Moisture</div>
            </div>
            <Sun size={38} color="#E5A93B" />
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
            Last updated: 10 mins ago (IMD Agromet)
          </div>
        </Card>

        {/* Current Advisory Shortcut */}
        <Card
          title={t('Current Advisory', 'Current Advisory')}
          icon={Sprout}
          enableVoice
          voiceText="Current Advisory: Dry spell expected. Log irrigation for wheat crops in booting stage."
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Badge variant="danger">Urgent Action</Badge>
            <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>PAU Extension</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)', marginBottom: '4px' }}>
            Irrigation Alert: Dry Spell
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            Temperatures &gt;35°C over next 5 days. Deep irrigation recommended.
          </p>
          <div style={{ marginTop: 'var(--space-3)', display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/farmer/advisories" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              View Advisory <ArrowRight size={12} />
            </Link>
          </div>
        </Card>

        {/* Mandi Price Pulse */}
        <Card
          title={t('Market Price Pulse', 'Market Price Pulse')}
          icon={TrendingUp}
          enableVoice
          voiceText="Market price pulse: Wheat rate is ₹2,275 per quintal, up 5% today at Khanna Mandi."
        >
          <div className="flex-between" style={{ marginBottom: '6px' }}>
            <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Wheat (PBW 550)</span>
            <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-primary)' }}>₹2,275/qtl</span>
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: '#155724', fontWeight: 600, marginBottom: '6px' }}>
            ▲ +5% vs yesterday at Khanna Mandi
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '8px' }}>
            Freshness: 15 mins ago (eNAM live feed)
          </div>
        </Card>
      </div>

      {/* Two Column Section: Farm Land & Active Alerts */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Land Parcels Summary */}
        <Card
          title={t('Registered Farmland', 'Registered Farmland')}
          icon={MapPinned}
          action={<Link to="/farmer/profile" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Manage Parcels →</Link>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {farmer.landParcels.map((parcel) => (
              <div key={parcel.id} className="flex-between" style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-surface-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{parcel.name} (Khasra {parcel.khasraNumber})</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{parcel.acres} Acres · {parcel.currentCrop}</div>
                </div>
                <Badge variant={parcel.status === 'VERIFIED' ? 'success' : 'warning'}>
                  {parcel.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Priority Alerts Summary */}
        <Card
          title={t('Active Alerts', 'Active Alerts')}
          icon={AlertTriangle}
          action={<Link to="/farmer/alerts" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{t('All Alerts', 'All Alerts')} ({alerts.priorityAlerts.length}) →</Link>}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {alerts.priorityAlerts.map((alert) => (
              <div key={alert.id} style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-danger-soft)', border: '1px solid rgba(179,38,30,0.2)', borderRadius: 'var(--radius-md)' }}>
                <div className="flex-between" style={{ marginBottom: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-danger)' }}>{alert.category}</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{alert.timeAgo}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--color-text)' }}>
                  {alert.headline}
                </div>
              </div>
            ))}

            {alerts.weatherUpdates.slice(0, 1).map((w) => (
              <div key={w.id} style={{ padding: 'var(--space-3)', backgroundColor: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                <div className="flex-between" style={{ marginBottom: '2px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-info)' }}>Weather Advisory</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{w.time}</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                  {w.headline}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
};
