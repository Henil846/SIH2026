export const initialFarmerData = {
  id: 'AGRI-9823-XYZ',
  name: 'Ramesh Kumar',
  village: 'Village Pratappur',
  district: 'District Ludhiana',
  state: 'Punjab',
  avatarUrl: '/farmer.png',
  phone: '+91 98765 43210',
  secondaryPhone: '+91 87654 32109',
  preferredLanguage: 'English',
  joinedDate: 'March 2023',
  landParcels: [
    {
      id: 'parcel-1',
      name: 'North Field',
      khasraNumber: '45/2',
      acres: 12.5,
      currentCrop: 'Wheat',
      soilType: 'Alluvial Loam',
      status: 'VERIFIED',
      verifiedBy: 'Punjab Land Revenue Board',
      lastUpdated: '10 mins ago'
    },
    {
      id: 'parcel-2',
      name: 'River Side',
      khasraNumber: '12/1',
      acres: 5.2,
      currentCrop: 'Mustard',
      soilType: 'Sandy Loam',
      status: 'PENDING VERIFICATION',
      verifiedBy: 'Pending District Revenue Officer Review',
      lastUpdated: '2 hours ago'
    }
  ],
  notifications: {
    weatherAlerts: true,
    marketPriceUpdates: false,
    schemeRecommendations: true
  }
};
