export const mockTenders = [
  { 
    id: 'TND-2026-042', 
    title: 'Thermal Surveillance Systems', 
    portal: 'Defense E-Procurement', 
    state: 'Texas', 
    category: 'Equipment', 
    value: '$4.2M - $5.5M', 
    pubDate: '2026-06-10', 
    closeDate: '2026-07-15', 
    score: 92, 
    status: 'Open',
    description: 'The Department of Defense is seeking proposals for the supply, installation, and maintenance of advanced thermal surveillance systems for border security and perimeter monitoring. The systems must be capable of operating in extreme weather conditions and integrate with existing command center software via standard APIs.',
    organization: 'Department of Defense - Texas Procurement Division',
    requirements: [
      'Minimum resolution of 640x480 at 30Hz or higher.',
      'Detection range of at least 5 kilometers for human targets.',
      'MIL-STD-810G certification for environmental engineering.',
      'AES-256 encryption for all data transmission.'
    ],
    documents: [
      { name: 'RFP_Thermal_Surveillance_Final.pdf', size: '2.4 MB' },
      { name: 'Technical_Specs_Annex_A.pdf', size: '1.1 MB' }
    ],
    keywords: ['Thermal', 'Surveillance', 'MIL-STD-810G', 'AES-256', 'Border Security']
  },
  { 
    id: 'TND-2026-089', 
    title: 'Border Security Drone Swarm System', 
    portal: 'Homeland Security Tenders', 
    state: 'Arizona', 
    category: 'Aerospace', 
    value: '$12.5M', 
    pubDate: '2026-06-11', 
    closeDate: '2026-08-01', 
    score: 88, 
    status: 'Open',
    description: 'Procurement of an autonomous drone swarm system for continuous border patrol and threat detection.',
    organization: 'Department of Homeland Security',
    requirements: ['Swarm intelligence capability', '12-hour flight time', 'Thermal imaging'],
    documents: [{ name: 'Drone_Specs.pdf', size: '5.2 MB' }],
    keywords: ['Drone', 'Swarm', 'Autonomous', 'Border Patrol']
  },
  { 
    id: 'TND-2026-112', 
    title: 'Naval Comm Terminals', 
    portal: 'Naval Supply Systems', 
    state: 'California', 
    category: 'Communications', 
    value: '$8.1M', 
    pubDate: '2026-06-05', 
    closeDate: '2026-06-30', 
    score: 85, 
    status: 'Expiring Soon',
    description: 'Encrypted communication terminals for deployment on active naval vessels.',
    organization: 'U.S. Navy',
    requirements: ['Satellite uplink', 'Waterproof IP68', 'Crypto-ignition key support'],
    documents: [{ name: 'Comm_Requirements.pdf', size: '3.1 MB' }],
    keywords: ['Naval', 'Encrypted', 'Satellite', 'IP68']
  },
  { 
    id: 'TND-2026-034', 
    title: 'Base Perimeter Security Upgrade', 
    portal: 'Army Contracting Command', 
    state: 'Virginia', 
    category: 'Infrastructure', 
    value: '$2.5M', 
    pubDate: '2026-06-01', 
    closeDate: '2026-06-20', 
    score: 65, 
    status: 'Expiring Soon',
    description: 'Physical infrastructure upgrades including reinforced fencing and motion sensors.',
    organization: 'U.S. Army Base Operations',
    requirements: ['Reinforced steel fencing', 'Seismic motion sensors', 'Integration with base CCTV'],
    documents: [{ name: 'Perimeter_Drawings.pdf', size: '15.4 MB' }],
    keywords: ['Perimeter', 'Fencing', 'Sensors']
  },
  { 
    id: 'TND-2026-156', 
    title: 'Cyber Defense Software Suite', 
    portal: 'Cyber Command Acquisitions', 
    state: 'Maryland', 
    category: 'Software', 
    value: '$15.0M', 
    pubDate: '2026-06-12', 
    closeDate: '2026-08-15', 
    score: 95, 
    status: 'Open',
    description: 'Enterprise-wide deployment of AI-driven threat detection and automated response software.',
    organization: 'U.S. Cyber Command',
    requirements: ['Zero-day threat detection', 'Automated containment', 'FedRAMP High authorization'],
    documents: [{ name: 'Software_RFP.pdf', size: '1.8 MB' }],
    keywords: ['Cyber', 'AI', 'Threat Detection', 'FedRAMP']
  },
];

export const mockDashboardStats = {
  totalTenders: 142593,
  newToday: 1249,
  aiMatched: 3842,
  highPriority: 156,
  activePortals: 48,
  alertsSent: 12492
};

export const mockKeywords = [
  { id: 1, keyword: 'Thermal Surveillance', category: 'Defense', count: 452, accuracy: 92 },
  { id: 2, keyword: 'Drone Swarm', category: 'Aerospace', count: 128, accuracy: 88 },
  { id: 3, keyword: 'Encrypted Comms', category: 'IT & Cyber', count: 345, accuracy: 95 },
  { id: 4, keyword: 'Perimeter Fence', category: 'Infrastructure', count: 512, accuracy: 76 },
  { id: 5, keyword: 'Tactical Gear', category: 'Defense', count: 890, accuracy: 82 },
];
