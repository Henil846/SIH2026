import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { initialFarmerData } from '../data/mockFarmer';
import { initialProducts } from '../data/mockProducts';
import { initialCertifications } from '../data/mockCertifications';
import { initialAuthorityQueue } from '../data/mockAuthorityQueue';
import { initialAlerts } from '../data/mockAlerts';
import { initialNews } from '../data/mockNews';
import { initialAdvisories } from '../data/mockAdvisories';
import { initialUsers } from '../data/mockUsers';
import { initialOrders } from '../data/mockOrders';
import { initialSchemes } from '../data/mockSchemes';
import { initialWaterRequests } from '../data/mockWaterRequests';
import { LANGUAGES, TRANSLATIONS, AGRI_GLOSSARY } from '../data/translations';
import { translateText, playTextSpeech, stopTextSpeech, getStaticTranslation } from '../services/translator';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Current active role: 'farmer' | 'buyer' | 'authority' | 'admin'
  const [role, setRole] = useState('farmer');
  
  // Current language code: 'en' | 'hi' | 'pa' | 'mr' | 'te' | 'ta' | 'bn' | 'gu' | 'kn'
  const [langCode, setLangCode] = useState('en');

  // Translation Modal State
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
  const [translatorInitialText, setTranslatorInitialText] = useState('');

  const openTranslator = useCallback((text = '') => {
    setTranslatorInitialText(text);
    setIsTranslatorOpen(true);
  }, []);

  const currentLanguage = useMemo(() => {
    return LANGUAGES.find(l => l.code === langCode) || LANGUAGES[0];
  }, [langCode]);

  const setLanguage = useCallback((lang) => {
    // Handle both code ('hi') and legacy names ('हिंदी', 'English')
    if (lang === 'English') {
      setLangCode('en');
    } else if (lang === 'हिंदी' || lang === 'Hindi') {
      setLangCode('hi');
    } else {
      const match = LANGUAGES.find(l => l.code === lang || l.name.toLowerCase() === String(lang).toLowerCase() || l.native === lang);
      setLangCode(match ? match.code : 'en');
    }
  }, []);

  // Instant UI translation helper
  const t = useCallback((key, fallback) => {
    if (!key) return '';
    if (langCode === 'en') return fallback || key;
    const translated = getStaticTranslation(key, langCode);
    return translated || fallback || key;
  }, [langCode]);

  // Farmer profile & parcels state
  const [farmer, setFarmer] = useState(initialFarmerData);

  // Products state (farmer & buyer marketplace)
  const [products, setProducts] = useState(initialProducts);

  // Certifications state (farmer requests & authority queue)
  const [certifications, setCertifications] = useState(initialCertifications);

  // Authority queue & active review document
  const [authorityQueue, setAuthorityQueue] = useState(initialAuthorityQueue);

  // Alerts state (unified alert center)
  const [alerts, setAlerts] = useState(initialAlerts);

  // News state
  const [news] = useState(initialNews);

  // Advisories state
  const [advisories, setAdvisories] = useState(initialAdvisories);

  // Users state (admin management)
  const [users, setUsers] = useState(initialUsers);

  // Orders state (buyer tracking)
  const [orders, setOrders] = useState(initialOrders);

  // Schemes & Water Requests
  const [schemes, setSchemes] = useState(initialSchemes);
  const [waterRequests, setWaterRequests] = useState(initialWaterRequests);

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  // Voice read-aloud simulation with regional voice synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingText, setSpeakingText] = useState('');

  const speakText = useCallback((text, targetLang) => {
    if (!text) return;
    if (isSpeaking) {
      stopTextSpeech();
      setIsSpeaking(false);
      setSpeakingText('');
      showToast('Audio playback stopped', 'info', 2000);
      return;
    }

    setIsSpeaking(true);
    setSpeakingText(text);
    showToast(`Reading aloud: "${text.length > 40 ? text.slice(0, 40) + '...' : text}"`, 'info', 3000);

    const played = playTextSpeech(text, targetLang || langCode, () => {
      setIsSpeaking(false);
      setSpeakingText('');
    });

    if (!played) {
      setTimeout(() => {
        setIsSpeaking(false);
        setSpeakingText('');
      }, 4000);
    }
  }, [isSpeaking, langCode, showToast]);

  // Farmer actions
  const updateFarmerPreferences = useCallback((newPrefs) => {
    setFarmer(prev => ({
      ...prev,
      preferredLanguage: newPrefs.preferredLanguage || prev.preferredLanguage,
      notifications: {
        ...prev.notifications,
        ...newPrefs.notifications
      }
    }));
    showToast('Preferences updated successfully', 'success');
  }, [showToast]);

  const addLandParcel = useCallback((parcel) => {
    const newParcel = {
      id: `parcel-${Date.now()}`,
      ...parcel,
      status: 'PENDING VERIFICATION',
      lastUpdated: 'Just now'
    };
    setFarmer(prev => ({
      ...prev,
      landParcels: [...prev.landParcels, newParcel]
    }));
    showToast(`Land parcel "${parcel.name}" added for verification`, 'success');
  }, [showToast]);

  // Product listing action (Seller)
  const addProduct = useCallback((productData) => {
    const newProd = {
      id: `prod-${Date.now()}`,
      ...productData,
      rating: 5.0,
      reviewsCount: 1,
      seller: farmer.name,
      sellerAvatar: farmer.avatarUrl,
      sellerLocation: `${farmer.village}, ${farmer.district}`,
      sellerRating: '5.0 (New Seller)',
      lastUpdated: 'Just now'
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${productData.name}" listed successfully on Marketplace!`, 'success');
  }, [farmer, showToast]);

  // Certification request action (Farmer)
  const submitCertificationRequest = useCallback((requestData) => {
    const newCert = {
      id: `REQ-${Date.now().toString().slice(-4)}A`,
      title: requestData.certificationType || 'Organic Transition Cert.',
      requestId: `REQ-${Date.now().toString().slice(-4)}A`,
      crop: requestData.cropDetail || 'Farm Crop',
      submittedDate: 'Today',
      status: 'Under Review',
      statusVariant: 'warning',
      issuingAuthority: 'Regional Agricultural Authority',
      currentStep: 2,
      steps: [
        { id: 1, name: 'Submitted', date: 'Today', status: 'completed' },
        { id: 2, name: 'Review', date: 'In Progress', status: 'current' },
        { id: 3, name: 'Approved', date: 'Pending', status: 'upcoming' }
      ],
      lastUpdated: 'Just now'
    };
    setCertifications(prev => [newCert, ...prev]);
    setAuthorityQueue(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        pendingCertifications: prev.stats.pendingCertifications + 1
      }
    }));
    showToast('Certification request submitted to Authority queue', 'success');
  }, [showToast]);

  // Authority actions: Approve / Reject document
  const approveReviewDoc = useCallback((reason) => {
    setAuthorityQueue(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        pendingCertifications: Math.max(0, prev.stats.pendingCertifications - 1)
      },
      recentItems: [
        {
          id: prev.activeReviewDoc.farmId,
          type: prev.activeReviewDoc.docType,
          applicant: `${prev.activeReviewDoc.farmerName} (${prev.activeReviewDoc.farmId})`,
          status: 'Approved',
          statusVariant: 'success',
          actionDate: 'Just now'
        },
        ...prev.recentItems
      ],
      activeReviewDoc: {
        ...prev.activeReviewDoc,
        status: 'Approved',
        statusVariant: 'success'
      }
    }));
    showToast('Document approved and compliance certificate issued!', 'success');
  }, [showToast]);

  const rejectReviewDoc = useCallback((reason) => {
    setAuthorityQueue(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        pendingCertifications: Math.max(0, prev.stats.pendingCertifications - 1)
      },
      recentItems: [
        {
          id: prev.activeReviewDoc.farmId,
          type: prev.activeReviewDoc.docType,
          applicant: `${prev.activeReviewDoc.farmerName} (${prev.activeReviewDoc.farmId})`,
          status: 'Denied',
          statusVariant: 'danger',
          actionDate: 'Just now'
        },
        ...prev.recentItems
      ],
      activeReviewDoc: {
        ...prev.activeReviewDoc,
        status: 'Denied',
        statusVariant: 'danger'
      }
    }));
    showToast('Document rejected. Feedback sent to applicant.', 'info');
  }, [showToast]);

  // Authority action: Publish Alert
  const publishAlert = useCallback(({ headline, message, severity, district, village }) => {
    const newAlert = {
      id: `alert-${Date.now()}`,
      category: severity === 'Emergency' ? 'Emergency Alert' : severity === 'Urgent' ? 'Priority Advisory' : 'General Notice',
      timeAgo: 'Just now',
      headline,
      body: message,
      read: false,
      severity,
      sourceAuthority: `District Authority (${district || 'All Districts'})`,
      targetLocation: village ? `${village}, ${district}` : (district || 'All Regions'),
      lastUpdated: 'Just now'
    };

    setAlerts(prev => ({
      ...prev,
      priorityAlerts: [newAlert, ...prev.priorityAlerts]
    }));
    showToast(`Alert "${headline}" published to all farmers in ${district || 'Target Region'}!`, 'success');
  }, [showToast]);

  // Alerts actions
  const markAlertRead = useCallback((alertId) => {
    setAlerts(prev => ({
      ...prev,
      priorityAlerts: prev.priorityAlerts.map(a => a.id === alertId ? { ...a, read: true } : a),
      weatherUpdates: prev.weatherUpdates.map(w => w.id === alertId ? { ...w, read: true } : w),
      marketShifts: prev.marketShifts.map(m => m.id === alertId ? { ...m, read: true } : m)
    }));
  }, []);

  const markAllAlertsRead = useCallback(() => {
    setAlerts(prev => ({
      priorityAlerts: prev.priorityAlerts.map(a => ({ ...a, read: true })),
      weatherUpdates: prev.weatherUpdates.map(w => ({ ...w, read: true })),
      marketShifts: prev.marketShifts.map(m => ({ ...m, read: true }))
    }));
    showToast('All alerts marked as read', 'success');
  }, [showToast]);

  // Admin action: update user role
  const updateUserRole = useCallback((userId, newRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    showToast(`User role updated to ${newRole}`, 'success');
  }, [showToast]);

  // Buyer action: create order
  const createOrder = useCallback((product, quantity) => {
    const qtyNum = Number(quantity) || 1;
    const total = product.price * qtyNum;
    const newOrder = {
      id: `AC-${Date.now().toString().slice(-4)}-MK`,
      orderNumber: `#AC-${Date.now().toString().slice(-4)}-MK`,
      status: 'Confirmed',
      statusVariant: 'success',
      productName: product.name,
      productThumbnail: product.image,
      quantity: `${qtyNum} x ${product.priceUnit || product.unit || 'Units'}`,
      totalPrice: total,
      currency: '₹',
      sellerName: product.seller || 'Verified Agri Seller',
      sellerLocation: product.sellerLocation || 'Punjab Mandi',
      sellerPhone: '+91 98765 11223',
      steps: [
        { id: 1, name: 'Requested', time: 'Just now', status: 'completed' },
        { id: 2, name: 'Confirmed', time: 'Just now', status: 'completed' },
        { id: 3, name: 'In Transit', time: 'Estimated 2 Days', status: 'current', icon: 'truck' },
        { id: 4, name: 'Completed', time: 'Pending', status: 'upcoming', icon: 'package' }
      ],
      invoice: {
        date: 'Today',
        taxId: 'GSTIN03AAAAA1234A1Z5',
        subtotal: total,
        deliveryFee: 150,
        total: total + 150
      },
      lastUpdated: 'Just now'
    };

    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order #${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        language: currentLanguage.name,
        langCode,
        currentLanguage,
        availableLanguages: LANGUAGES,
        setLanguage,
        t,
        isTranslatorOpen,
        setIsTranslatorOpen,
        openTranslator,
        translatorInitialText,
        translateDynamicText: (text, target, src) => translateText(text, target || langCode, src || 'en'),
        farmer,
        setFarmer,
        updateFarmerPreferences,
        addLandParcel,
        products,
        addProduct,
        certifications,
        submitCertificationRequest,
        authorityQueue,
        approveReviewDoc,
        rejectReviewDoc,
        alerts,
        publishAlert,
        markAlertRead,
        markAllAlertsRead,
        news,
        advisories,
        users,
        updateUserRole,
        orders,
        createOrder,
        schemes,
        waterRequests,
        toast,
        showToast,
        isSpeaking,
        speakingText,
        speakText
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
