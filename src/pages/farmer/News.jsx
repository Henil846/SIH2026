import React, { useState } from 'react';
import {
  Newspaper,
  ArrowRight,
  TrendingUp,
  CloudRain,
  ExternalLink,
  X,
  Calendar,
  Building,
  FileText,
  Share2,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { PageShell } from '../../components/layout/PageShell';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { VoiceButton } from '../../components/ui/VoiceButton';
import { useApp } from '../../context/AppContext';

export const FarmerNews = () => {
  const { news, showToast, t } = useApp();
  const [filter, setFilter] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredNews = news.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Government' && item.category.includes('Government')) return true;
    if (filter === 'Market' && item.category.includes('Market')) return true;
    if (filter === 'Weather' && item.category.includes('Weather')) return true;
    return false;
  });

  const handleOpenArticle = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handleShareArticle = (e, article) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'success');
    } else {
      showToast('Sharing article: ' + article.headline, 'info');
    }
  };

  return (
    <PageShell title="News Feed" contentMaxWidth="920px">
      <div className="page-header" style={{ marginBottom: 'var(--space-4)' }}>
        <div className="page-title-group">
          <div className="page-title">
            <span>{t('News Feed', 'Agriculture News Feed')}</span>
            <VoiceButton textToRead="Agriculture News Feed. Official announcements, mandi market trends, and agro-climatic advisories. Click any article to read the full directive." />
          </div>
          <span className="page-subtitle">Stay informed with critical agricultural announcements, MSP revisions, and weather bulletins.</span>
        </div>
      </div>

      {/* Filter Pill Row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: 'var(--space-5)', flexWrap: 'wrap' }}>
        {['All', 'Government', 'Market', 'Weather'].map((category) => (
          <button
            key={category}
            type="button"
            className={`btn btn-sm ${filter === category ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setFilter(category)}
          >
            {category === 'All' ? 'All Updates' : `${category} Directives`}
          </button>
        ))}
      </div>

      {/* Vertical News Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {filteredNews.map((article) => (
          <div
            key={article.id}
            onClick={() => handleOpenArticle(article)}
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-card)',
              display: 'grid',
              gridTemplateColumns: '260px 1fr',
              gap: 'var(--space-4)',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          >
            {/* Left Image Area with Category Badge */}
            <div style={{ position: 'relative', height: '100%', minHeight: '190px' }}>
              <img
                src={article.image}
                alt={article.headline}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                <Badge variant={article.badgeVariant || 'info'}>
                  {article.category}
                </Badge>
              </div>
            </div>

            {/* Right Content */}
            <div style={{ padding: 'var(--space-4) var(--space-5) var(--space-4) 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="flex-between" style={{ marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Building size={12} />
                    {article.sourceAuthority}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} />
                    {article.timeAgo}
                  </span>
                </div>

                <h3 style={{ fontSize: 'var(--text-md)', fontWeight: 700, lineHeight: 1.35, marginBottom: '8px', color: 'var(--color-text)' }}>
                  {article.headline}
                </h3>

                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', lineHeight: 1.45, margin: 0 }}>
                  {article.body}
                </p>
              </div>

              <div style={{ marginTop: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                  variant={article.badgeVariant === 'danger' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenArticle(article);
                  }}
                >
                  {article.cta}
                </Button>

                <button
                  type="button"
                  onClick={(e) => handleShareArticle(e, article)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    padding: '6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px'
                  }}
                  title="Share Article"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FULL ARTICLE DETAIL MODAL */}
      {selectedArticle && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.2s ease-out'
          }}
          onClick={handleCloseArticle}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              maxWidth: '760px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image Banner */}
            <div style={{ position: 'relative', height: '220px', width: '100%', overflow: 'hidden' }}>
              <img
                src={selectedArticle.image}
                alt={selectedArticle.headline}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%)'
                }}
              />

              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseArticle}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  border: 'none',
                  borderRadius: '50%',
                  color: '#fff',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)')}
                aria-label="Close article"
              >
                <X size={20} />
              </button>

              {/* Badges on Banner */}
              <div style={{ position: 'absolute', bottom: '16px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Badge variant={selectedArticle.badgeVariant || 'info'}>
                    {selectedArticle.category}
                  </Badge>
                  {selectedArticle.referenceNo && (
                    <span style={{ fontSize: '11px', color: '#e5e7eb', backgroundColor: 'rgba(0,0,0,0.4)', padding: '2px 8px', borderRadius: '4px' }}>
                      Ref: {selectedArticle.referenceNo}
                    </span>
                  )}
                </div>
                <span style={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}>
                  {selectedArticle.timeAgo}
                </span>
              </div>
            </div>

            {/* Article Body Content */}
            <div style={{ padding: '24px 28px', flex: 1 }}>
              {/* Metadata row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', fontSize: '12px' }}>
                  <Building size={14} color="var(--color-primary)" />
                  <strong>{selectedArticle.sourceAuthority}</strong>
                  <span>•</span>
                  <Calendar size={14} />
                  <span>{selectedArticle.publishDate || selectedArticle.timeAgo}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <VoiceButton
                    textToRead={`${selectedArticle.headline}. ${selectedArticle.fullContent?.lead || selectedArticle.body}`}
                  />
                  <button
                    type="button"
                    onClick={(e) => handleShareArticle(e, selectedArticle)}
                    style={{
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Share2 size={13} />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>

              {/* Main Headline */}
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--color-text)', lineHeight: 1.3, marginBottom: '16px' }}>
                {selectedArticle.headline}
              </h2>

              {/* Lead Paragraph */}
              <p style={{ fontSize: '15px', color: '#374151', lineHeight: 1.6, fontWeight: 500, marginBottom: '20px', backgroundColor: '#F9FAFB', padding: '14px 18px', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)' }}>
                {selectedArticle.fullContent?.lead || selectedArticle.body}
              </p>

              {/* Full Content Sections */}
              {selectedArticle.fullContent?.sections?.map((sec, idx) => (
                <div key={idx} style={{ marginBottom: '22px' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1B4332', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={16} color="var(--color-primary)" />
                    {sec.heading}
                  </h4>

                  {/* Section: Table Type */}
                  {sec.type === 'table' && sec.tableData && (
                    <div style={{ overflowX: 'auto', border: '1px solid #E5E7EB', borderRadius: '8px', marginBottom: '10px' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#F3F4F6', color: '#374151', borderBottom: '1px solid #E5E7EB' }}>
                            <th style={{ padding: '10px 14px', fontWeight: 600 }}>Crop / Commodity</th>
                            <th style={{ padding: '10px 14px', fontWeight: 600 }}>Previous Rate</th>
                            <th style={{ padding: '10px 14px', fontWeight: 600 }}>Revised MSP / Price</th>
                            <th style={{ padding: '10px 14px', fontWeight: 600 }}>Net Increase</th>
                            <th style={{ padding: '10px 14px', fontWeight: 600 }}>Status / Margin</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sec.tableData.map((row, rIdx) => (
                            <tr key={rIdx} style={{ borderBottom: rIdx !== sec.tableData.length - 1 ? '1px solid #F3F4F6' : 'none' }}>
                              <td style={{ padding: '10px 14px', fontWeight: 600, color: '#111827' }}>{row.crop}</td>
                              <td style={{ padding: '10px 14px', color: '#6B7280' }}>{row.prevMsp}</td>
                              <td style={{ padding: '10px 14px', fontWeight: 700, color: '#15803d' }}>{row.newMsp}</td>
                              <td style={{ padding: '10px 14px', color: '#0369a1', fontWeight: 600 }}>{row.increase}</td>
                              <td style={{ padding: '10px 14px' }}>
                                <Badge variant="success">{row.returnOverCost}</Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Section: Points Type */}
                  {sec.type === 'points' && sec.points && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sec.points.map((pt, pIdx) => (
                        <li key={pIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13.5px', color: '#4B5563', lineHeight: 1.5 }}>
                          <CheckCircle size={16} color="#15803d" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Section: Callout Type */}
                  {sec.type === 'callout' && (
                    <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '10px' }}>
                      <AlertCircle size={18} color="#B45309" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <div style={{ fontSize: '13px', color: '#92400E', lineHeight: 1.5, fontWeight: 500 }}>
                        {sec.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Official Stamp Footer */}
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '16px', marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                  Verified by AgriConnect National Agronomy Network • Published for registered farmers
                </div>

                <Button variant="primary" size="sm" onClick={handleCloseArticle}>
                  Close Directive
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
};
