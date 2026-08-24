import React from 'react';
import { TrendingUp, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table } from '../../components/ui/Table';
import { VoiceButton } from '../../components/ui/VoiceButton';

export const MarketPrices = () => {
  const mandiData = [
    { id: 1, crop: 'Wheat (PBW 550)', mandi: 'Khanna Mandi, Ludhiana', price: '₹2,275', trend: '+5.0%', isUp: true, msp: '₹2,275', date: 'Today, 11:30 AM' },
    { id: 2, crop: 'Mustard (Pusa Bold)', mandi: 'Ludhiana Central', price: '₹5,450', trend: '+2.1%', isUp: true, msp: '₹5,650', date: 'Today, 10:45 AM' },
    { id: 3, crop: 'Basmati Rice (1121)', mandi: 'Amritsar Grain Market', price: '₹3,850', trend: '-1.2%', isUp: false, msp: 'N/A (Open Market)', date: 'Today, 09:15 AM' },
    { id: 4, crop: 'Cotton (Medium Staple)', mandi: 'Bathinda Mandi', price: '₹6,620', trend: '+0.8%', isUp: true, msp: '₹6,620', date: 'Yesterday' }
  ];

  const columns = [
    { key: 'crop', header: 'Crop / Variety', render: (r) => <span style={{ fontWeight: 600 }}>{r.crop}</span> },
    { key: 'mandi', header: 'Mandi Location' },
    { key: 'price', header: 'Modal Rate (/qtl)', render: (r) => <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{r.price}</span> },
    {
      key: 'trend',
      header: 'Daily Trend',
      render: (r) => (
        <span style={{ color: r.isUp ? '#155724' : '#721c24', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
          {r.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {r.trend}
        </span>
      )
    },
    { key: 'msp', header: 'Official MSP' },
    { key: 'date', header: 'Freshness', align: 'right' }
  ];

  return (
    <PageShell title="Market Prices">
      <div className="page-header">
        <div className="page-title-group">
          <div className="page-title">
            <span>Market Prices</span>
            <VoiceButton textToRead="Market Prices. Live Mandi price bulletins from eNAM and Punjab Mandi Board." />
          </div>
          <span className="page-subtitle">Live wholesale price bulletins verified from eNAM & state mandi boards.</span>
        </div>
      </div>

      <Table
        columns={columns}
        data={mandiData}
        keyField="id"
      />
    </PageShell>
  );
};
