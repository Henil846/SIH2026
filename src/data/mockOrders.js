export const initialOrders = [
  {
    id: 'AC-8492-MK',
    orderNumber: '#AC-8492-MK',
    status: 'In Transit',
    statusVariant: 'info',
    productName: 'Premium Grade Wheat Seeds (Sharbati)',
    productThumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&auto=format&fit=crop&q=80',
    quantity: '5 x 50kg Bags',
    totalPrice: 8750,
    currency: '₹',
    sellerName: 'Kisan Agro Supplies',
    sellerLocation: 'Ludhiana, Punjab',
    sellerPhone: '+91 98765 11223',
    steps: [
      { id: 1, name: 'Requested', time: 'Oct 12, 09:00', status: 'completed' },
      { id: 2, name: 'Confirmed', time: 'Oct 12, 14:30', status: 'completed' },
      { id: 3, name: 'In Transit', time: 'Est. Oct 14', status: 'current', icon: 'truck' },
      { id: 4, name: 'Completed', time: 'Pending', status: 'upcoming', icon: 'package' }
    ],
    invoice: {
      date: '12 Oct 2024',
      taxId: 'GSTIN03AAAAA1234A1Z5',
      subtotal: 8500,
      deliveryFee: 250,
      total: 8750
    },
    lastUpdated: '15 mins ago'
  }
];
