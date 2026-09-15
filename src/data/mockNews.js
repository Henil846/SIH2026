export const initialNews = [
  {
    id: 'news-msp-announcement',
    category: 'Government Directive',
    badgeVariant: 'danger',
    timeAgo: '2 Hours Ago',
    publishDate: 'September 15, 2026',
    referenceNo: 'F.No. 1-14/2026-CA.II (Agri MSP Gazette)',
    headline: 'New Minimum Support Price for Wheat Announced for Rabi Season',
    summary: 'The central agricultural ministry has released updated MSP guidelines for the upcoming Rabi harvest season, indicating a 5% increase in procurement prices to support local growers.',
    body: 'The central agricultural ministry has released updated MSP guidelines for the upcoming Rabi harvest season, indicating a 5% increase in procurement prices to support local growers.',
    cta: 'Read Full Directive →',
    sourceAuthority: 'Ministry of Agriculture & Farmers Welfare',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80',
    lastUpdated: '2 hours ago',
    fullContent: {
      lead: 'In a major boost to agrarian income ahead of the Rabi marketing season 2026-27, the Cabinet Committee on Economic Affairs (CCEA) chaired by the Hon\'ble Prime Minister has approved the increase in Minimum Support Prices (MSP) for all mandated Rabi crops.',
      sections: [
        {
          heading: 'Key MSP Rate Revisions (₹ per Quintal)',
          type: 'table',
          tableData: [
            { crop: 'Wheat (गेहूं)', prevMsp: '₹2,275', newMsp: '₹2,425', increase: '+₹150 (+6.6%)', costOfProd: '₹1,128', returnOverCost: '115%' },
            { crop: 'Mustard & Rapeseed (सरसों)', prevMsp: '₹5,650', newMsp: '₹5,950', increase: '+₹300 (+5.3%)', costOfProd: '₹2,855', returnOverCost: '108%' },
            { crop: 'Gram / Chana (चना)', prevMsp: '₹5,440', newMsp: '₹5,650', increase: '+₹210 (+3.9%)', costOfProd: '₹3,410', returnOverCost: '66%' },
            { crop: 'Barley (जौ)', prevMsp: '₹1,850', newMsp: '₹1,980', increase: '+₹130 (+7.0%)', costOfProd: '₹1,190', returnOverCost: '66%' }
          ]
        },
        {
          heading: 'Official Procurement Guidelines',
          type: 'points',
          points: [
            'Direct electronic payment (DBT) directly into verified bank accounts within 48 hours of mandi weighment.',
            'Procurement centers set up at 1,850+ Primary Agricultural Credit Societies (PACS) across Punjab, Haryana, Rajasthan, and MP.',
            'Digital moisture verification will accept up to 12% moisture limit without penalty deductions.',
            'Farmers must carry their AgriConnect Digital ID or Aadhaar-linked land record receipt at the time of delivery.'
          ]
        },
        {
          heading: 'Farmer Action Checklist',
          type: 'callout',
          text: 'Registration for Rabi MSP procurement opens on the 1st of next month on the e-NAM portal and district mandi windows. Please ensure your bank accounts are Aadhaar-seeded.'
        }
      ]
    }
  },
  {
    id: 'news-soybean-futures',
    category: 'Market Insight',
    badgeVariant: 'warning',
    timeAgo: 'Today, 08:30 AM',
    publishDate: 'September 15, 2026',
    referenceNo: 'NCDEX-MKT-REPORT-2026/09',
    headline: 'Soybean Futures Surge Amid Regional Supply Shortages',
    summary: 'Early trading indicates strong upward pressure on soybean prices due to lower-than-expected yields in central districts. Experts suggest holding stock if storage permits.',
    body: 'Early trading indicates strong upward pressure on soybean prices due to lower-than-expected yields in central districts. Experts suggest holding stock if storage permits.',
    cta: 'View Market Data',
    sourceAuthority: 'National Commodity & Derivatives Exchange (NCDEX)',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop&q=80',
    lastUpdated: '4 hours ago',
    fullContent: {
      lead: 'Soybean benchmark contracts on the National Commodity & Derivatives Exchange (NCDEX) rallied by 4.2% in early morning trading, driven by tight pipeline stocks in crushing hubs of Indore, Latur, and Kota.',
      sections: [
        {
          heading: 'Current Spot & Futures Pricing Breakdown',
          type: 'table',
          tableData: [
            { crop: 'Soybean Yellow (Indore Spot)', prevMsp: '₹4,880', newMsp: '₹5,180', increase: '+₹300/Qtl', costOfProd: '₹4,600', returnOverCost: 'Bullish' },
            { crop: 'Soybean Delivery (Oct Contract)', prevMsp: '₹4,940', newMsp: '₹5,260', increase: '+₹320/Qtl', costOfProd: '₹4,650', returnOverCost: 'Strong Buy' },
            { crop: 'Soymeal (Ex-Plant Export)', prevMsp: '₹37,500/MT', newMsp: '₹39,800/MT', increase: '+₹2,300/MT', costOfProd: '—', returnOverCost: 'High Demand' }
          ]
        },
        {
          heading: 'Market Drivers & Analyst Insights',
          type: 'points',
          points: [
            'Global palm oil price strength has increased domestic demand for domestic soy oil fractions.',
            'Delayed arrivals from late-sown fields in Marathwada and Malwa regions reduced daily mandi arrivals by 35%.',
            'Major poultry feed manufacturers have entered forward purchase contracts for non-GMO soy meal.',
            'Warehouse storage operators report high capacity demand with drying facilities operating at full volume.'
          ]
        },
        {
          heading: 'Strategic Advisory for Producers',
          type: 'callout',
          text: 'Growers with access to safe, moisture-controlled storage (under 10% seed moisture) are advised to stagger sales across the next 30-45 days rather than panic selling on initial harvest arrival.'
        }
      ]
    }
  },
  {
    id: 'news-unseasonal-rainfall',
    category: 'Weather Advisory',
    badgeVariant: 'info',
    timeAgo: 'Yesterday',
    publishDate: 'September 14, 2026',
    referenceNo: 'IMD-AGROMET-BULLETIN-NORTH-44',
    headline: 'Unseasonal Rainfall Expected in Northern Sectors',
    summary: 'Meteorological departments forecast scattered thunderstorms over the next 48 hours. Farmers are advised to secure harvested crops and delay immediate sowing activities.',
    body: 'Meteorological departments forecast scattered thunderstorms over the next 48 hours. Farmers are advised to secure harvested crops and delay immediate sowing activities.',
    cta: 'Read Details',
    sourceAuthority: 'IMD Agromet Advisory Services',
    image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&auto=format&fit=crop&q=80',
    lastUpdated: '1 day ago',
    fullContent: {
      lead: 'A western disturbance interacting with easterly winds from the Bay of Bengal is likely to trigger light to moderate thunderstorm activity accompanied by gusty winds (35-45 km/h) across northern agricultural plains over the next 48 to 72 hours.',
      sections: [
        {
          heading: 'Impacted Agricultural Zones',
          type: 'table',
          tableData: [
            { crop: 'Punjab (Ludhiana, Patiala, Bathinda)', prevMsp: 'Light-Moderate', newMsp: '15-25 mm', increase: 'Sep 16-17', costOfProd: 'High Wind', returnOverCost: 'Orange Alert' },
            { crop: 'Haryana (Karnal, Hisar, Ambala)', prevMsp: 'Moderate Thunder', newMsp: '20-35 mm', increase: 'Sep 16-17', costOfProd: 'Hail Hazard', returnOverCost: 'Orange Alert' },
            { crop: 'Western UP (Meerut, Aligarh, Agra)', prevMsp: 'Scattered Showers', newMsp: '10-20 mm', increase: 'Sep 17-18', costOfProd: 'Moderate', returnOverCost: 'Yellow Alert' }
          ]
        },
        {
          heading: 'Field Preparedness & Crop Protection Protocol',
          type: 'points',
          points: [
            'Harvested Produce: Shift harvested paddy, pulses, or early vegetables to covered sheds or cover immediately with high-density tarpaulins on elevated pallets.',
            'Drainage: Clear drainage channels, furrows, and bund outlets in standing vegetable and cotton fields to prevent root water-logging.',
            'Pesticide & Fertilizer Spray: Postpone all foliar nutrient applications and pesticide spray operations until weather stabilizes to avoid chemical runoff.',
            'Irrigation Schedule: Suspend canal water and tube-well irrigation for the next 3 days across Punjab and Haryana.'
          ]
        },
        {
          heading: 'Crop Insurance & Emergency Helpline',
          type: 'callout',
          text: 'In case of localized storm or hail damage, intimate your district PMFBY insurance agent or call Kisan Call Center (1800-180-1551) within 72 hours of the weather event.'
        }
      ]
    }
  }
];
