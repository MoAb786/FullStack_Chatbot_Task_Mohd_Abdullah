import type { ChatIntent } from '../types';

export const INITIAL_BOT_MESSAGE = {
  id: 'welcome-1',
  sender: 'bot' as const,
  text: "Hello! I'm DroneTV's AI Support & Lead Assistant. I can assist you with DGCA pilot training, aerial cinematography, drone survey services, fee structures, eligibility, and course admissions. How can I help you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export interface QuickPromptCategory {
  category: string;
  icon: string;
  prompts: string[];
}

export const CATEGORIZED_PROMPTS: QuickPromptCategory[] = [
  {
    category: 'Pilot Academy & Licenses',
    icon: 'school',
    prompts: [
      'What courses / training are available?',
      'What are the eligibility requirements for DGCA Pilot License?',
      'What is the duration of the pilot certification course?',
      'Do you provide DGCA job placement assistance?',
      'What is the difference between Small & Medium category license?',
      'I am a student.',
    ],
  },
  {
    category: 'Commercial UAV Services',
    icon: 'flight_takeoff',
    prompts: [
      'What services does DroneTV provide?',
      'What drone payloads & sensors do you support?',
      'How does precision agriculture spraying work?',
      'What software do you teach for 3D mapping and photogrammetry?',
      'Can I hire a certified drone pilot for a commercial project?',
      'I am interested in a service.',
    ],
  },
  {
    category: 'Admissions, Pricing & Compliance',
    icon: 'verified_user',
    prompts: [
      'What is the fee structure / pricing?',
      'How can I register?',
      'What safety regulations and DGCA permissions do you follow?',
      'How can I contact DroneTV?',
      'I want to speak with someone.',
    ],
  },
];

export const QUICK_PROMPTS = [
  'What services does DroneTV provide?',
  'What courses / training are available?',
  'What are the eligibility requirements for DGCA Pilot License?',
  'What is the fee structure / pricing?',
  'What drone payloads & sensors do you support?',
  'I am a student.',
  'I am interested in a service.',
  'How can I register?',
  'What is the duration of the pilot course?',
  'Do you provide job placement assistance?',
  'How does precision agriculture spraying work?',
  'What safety regulations and DGCA permissions do you follow?',
  'How can I contact DroneTV?',
  'I want to speak with someone.',
];

export const CHAT_INTENTS: ChatIntent[] = [
  {
    id: 'services',
    keywords: [
      'services',
      'service',
      'what do you provide',
      'what services',
      'offerings',
      'solutions',
      'capabilities',
    ],
    response:
      'DroneTV provides enterprise-grade UAV flight operations across India:\n\n• High-Altitude Aerial Cinematography & FPV (RED / ARRI gimbals)\n• GIS Mapping & 3D Photogrammetry (Sub-centimeter accuracy)\n• Precision Agriculture Spraying & Multispectral Crop Health Analysis\n• Industrial & Infrastructure Inspection (Thermal & LiDAR)\n• Custom Drone Engineering, Firmware & Assembly\n\nWould you like to request a quote or view our fleet specs?',
    action: {
      type: 'enquiry',
      label: 'Request Service Quote',
      payload: 'Commercial UAV Services & Operations',
    },
  },
  {
    id: 'courses',
    keywords: [
      'courses',
      'training',
      'what courses',
      'pilot training',
      'license',
      'dgca course',
      'learn drone',
      'drone school',
      'academy',
      'curriculum',
    ],
    response:
      'We offer DGCA-approved Drone Pilot Certification & Technical Academies:\n\n1. DGCA Remote Pilot Certificate (Small Category - up to 25kg)\n2. DGCA Medium Category Pilot Training (25kg - 150kg)\n3. Advanced Aerial Cinematography & FPV Masterclass\n4. GIS Surveying, LiDAR & Photogrammetry Specialization\n5. Drone Hardware Assembly, Maintenance & Firmware Engineering\n\nBatches feature hands-on simulator hours, flight field training, and government DGCA portal registration.',
    action: {
      type: 'enquiry',
      label: 'Explore Pilot Academies',
      payload: 'DGCA Remote Pilot Certification (Small Category)',
    },
  },
  {
    id: 'eligibility',
    keywords: [
      'eligibility',
      'requirements',
      'qualifications',
      'age limit',
      'who can apply',
      'medical fitness',
      'criteria',
      'documents required',
      'passport',
    ],
    response:
      'DGCA Remote Pilot License Eligibility Criteria (per Drone Rules 2021):\n\n• Age: Minimum 18 years, maximum 65 years\n• Education: Minimum 10th standard pass from a recognized board\n• ID Proof: Valid Indian Passport or Aadhaar card linked with mobile\n• Medical Fitness: Basic medical fitness certificate from a registered medical practitioner\n• Background: No prior aviation suspension\n\nOur admissions desk handles DigitalSky portal verification and onboarding documentation.',
    action: {
      type: 'enquiry',
      label: 'Check Eligibility & Register',
      payload: 'DGCA Pilot Eligibility Consultation',
    },
  },
  {
    id: 'duration',
    keywords: [
      'duration',
      'how long',
      'how many days',
      'time period',
      'course length',
      'batch timing',
      'schedule',
      'weeks',
      'hours',
    ],
    response:
      'Course Duration & Training Schedules:\n\n• DGCA Small Category Pilot License: 5 Days (Full-time intensive, Theory + Simulator + Flight Field)\n• DGCA Medium Category Pilot Training: 7 Days (Heavy-lift multirotors & failsafe drills)\n• Aerial Cinematography & FPV Masterclass: 3 Weeks (Weekend batches available)\n• GIS Surveying & LiDAR Specialization: 4 Weeks (Hands-on Pix4D & QGIS)\n• Drone Assembly & Engineering: 2 Weeks hands-on lab workshop\n\nWeekend and accelerated fast-track batches are also available for working professionals.',
    action: {
      type: 'enquiry',
      label: 'View Batch Schedules',
      payload: 'Upcoming Batch Schedule Enquiry',
    },
  },
  {
    id: 'placement',
    keywords: [
      'placement',
      'job',
      'career',
      'employment',
      'hiring',
      'salary',
      'opportunities',
      'after course',
      'industry tie ups',
    ],
    response:
      'Yes! DroneTV has an active Career Placement Cell with 50+ industry partners:\n\n• 100% Placement Assistance for DGCA-certified graduates\n• Direct recruitment opportunities in Agriculture spraying, Solar/Wind farm inspection, Mining GIS mapping, and Bollywood/OTT cinematography\n• Average starting salary ranges from ₹3.5 LPA to ₹8.5 LPA depending on specialization and flight hours\n• Access to DroneTV Verified Pilot Network for freelance contract gigs.',
    action: {
      type: 'enquiry',
      label: 'Connect with Career Desk',
      payload: 'Pilot Placement & Career Support',
    },
  },
  {
    id: 'small_vs_medium',
    keywords: [
      'small vs medium',
      'category',
      'small category',
      'medium category',
      'difference between',
      'weight',
      '25kg',
      '150kg',
    ],
    response:
      'Difference between Drone Categories under DGCA:\n\n• Small Category (2kg to 25kg): Covers commercial drones like DJI Matrice 350, Inspire 3, Mavic 3 Enterprise. Used for aerial photography, surveying, construction mapping, and infrastructure inspection.\n\n• Medium Category (25kg to 150kg): Covers industrial heavy-lift drones and agricultural spraying drones (10L-30L payload tanks). Required for large-scale crop spraying, heavy logistics, and specialized LiDAR rigs.',
    action: {
      type: 'enquiry',
      label: 'Consult Academy Advisor',
      payload: 'DGCA Small vs Medium Certification Guide',
    },
  },
  {
    id: 'payloads_sensors',
    keywords: [
      'payload',
      'payloads',
      'sensor',
      'sensors',
      'lidar',
      'thermal',
      'multispectral',
      'rgb',
      'camera',
      'flir',
      'hesai',
      'micasense',
      'red raptor',
    ],
    response:
      'DroneTV operates state-of-the-art payloads and sensor suites:\n\n• LiDAR: Hesai XT32 & Livox AVIA for high-density 3D terrain point clouds under dense canopy\n• Thermal Radiometric: FLIR Vue Pro R 640 for solar panel hot-spot detection & high-voltage lines\n• Multispectral: MicaSense RedEdge-P 5-band sensor for NDVI agricultural vigor mapping\n• Cinema: RED V-Raptor 8K VV, ARRI Alexa Mini LF, and custom full-frame Sony FX6 rigs\n• Photogrammetry: 100MP Phase One & 45MP Full-Frame mechanical shutter RGB cameras.',
    action: {
      type: 'enquiry',
      label: 'Request Payload Specs',
      payload: 'Sensor & Payload Technical Inquiry',
    },
  },
  {
    id: 'agriculture',
    keywords: [
      'agriculture',
      'crop',
      'spraying',
      'farming',
      'pesticide',
      'fertilizer',
      'multispectral mapping',
      'kisan',
      'farm',
      'acre',
    ],
    response:
      'Our Precision Agriculture Solutions include:\n\n• Autonomous Crop Spraying: High-precision electrostatic nozzles covering up to 30 acres per hour with 90% water savings and zero chemical runoff\n• Multispectral Crop Health: NDVI & NDRE vigor index maps to identify pest infestations, water stress, and nutrient deficiency weeks before visible to human eyes\n• Yield Estimation & Soil Analysis for contract farming and crop insurance verification.',
    action: {
      type: 'enquiry',
      label: 'Book Agri-Drone Demo',
      payload: 'Precision Agriculture Spraying & Survey',
    },
  },
  {
    id: 'mapping_software',
    keywords: [
      'software',
      'photogrammetry',
      'pix4d',
      'dronedeploy',
      'agisoft',
      'metashape',
      'qgis',
      'arcgis',
      'point cloud',
      'orthomosaic',
      'autocad',
    ],
    response:
      'Our GIS & Photogrammetry curriculum and production workflows use industry-standard suites:\n\n• Processing: Pix4Dmapper, Pix4Dmatic, Agisoft Metashape Pro, and DroneDeploy\n• GIS & CAD: QGIS, ArcGIS Pro, AutoCAD Civil 3D, and Global Mapper\n• Deliverables: Orthomosaics (GeoTIFF), Digital Elevation Models (DEM/DTM), 3D Textured Meshes (OBJ/FBX), and LAS/LAZ LiDAR Point Clouds with GCP calibration.',
    action: {
      type: 'enquiry',
      label: 'Enroll in GIS & Survey Track',
      payload: 'GIS Photogrammetry & LiDAR Academy',
    },
  },
  {
    id: 'hire_pilot',
    keywords: [
      'hire pilot',
      'pilot on hire',
      'single day',
      'operator',
      'freelance pilot',
      'rent drone',
      'pilot booking',
      'crew',
    ],
    response:
      'Yes! DroneTV provides certified, insured, and experienced DGCA drone pilots with commercial gear for short-term and project-based assignments across India:\n\n• Day-rate bookings for TV, film, events, and real estate\n• Dedicated enterprise flight crews with backup drones, RTK base stations, and live monitor feeds\n• DGCA flight permissions and airspace clearance handled entirely by our operations desk.',
    action: {
      type: 'enquiry',
      label: 'Book a Certified Pilot',
      payload: 'Certified Pilot Crew Dispatch',
    },
  },
  {
    id: 'regulations_safety',
    keywords: [
      'safety',
      'regulations',
      'permission',
      'permissions',
      'rules',
      'digitalsky',
      'red zone',
      'green zone',
      'yellow zone',
      'npnt',
      'insurance',
      'compliance',
    ],
    response:
      'All DroneTV operations and academies strictly comply with the Ministry of Civil Aviation Drone Rules 2021:\n\n• Green Zones: Automated flight logging up to 400ft AGL\n• Yellow & Red Zones: Fast-track DGCA & Air Traffic Control (ATC) clearance through our operations desk\n• Third-Party Aviation Insurance: Mandatory ₹1 Crore policy coverage on all commercial missions\n• Safety Protocols: Pre-flight failsafe calibration, return-to-home (RTH) geo-fencing, and dual parachute systems.',
    action: {
      type: 'enquiry',
      label: 'Consult Compliance Desk',
      payload: 'Airspace Clearance & Safety Compliance',
    },
  },
  {
    id: 'student',
    keywords: [
      'student',
      'i am a student',
      'college',
      'internship',
      'engineering student',
      'discount',
      'student discount',
      'academic',
      'final year',
    ],
    response:
      'Welcome! We offer up to 25% student scholarships, university workshop tie-ups, semester internship programs, and project mentorship for engineering students. You can enroll in our DGCA Pilot Training or join our Drone Assembly & Flight Controller Hardware labs.',
    action: {
      type: 'enquiry',
      label: 'Apply for Student Discount',
      payload: 'DGCA Pilot Training (Student Scholarship)',
    },
  },
  {
    id: 'interested_service',
    keywords: [
      'interested in a service',
      'hire drone',
      'service enquiry',
      'quote',
      'quotation',
      'commercial project',
      'shoot',
      'survey project',
    ],
    response:
      'We would be excited to partner on your mission! Our flight operations team provides certified pilots, DGCA-compliant enterprise UAVs, dual-operator monitor setups, and turnkey post-processing deliverables tailored to your scope.',
    action: {
      type: 'enquiry',
      label: 'Request Service Quote',
      payload: 'Commercial Aerial Survey & Mapping Service',
    },
  },
  {
    id: 'registration',
    keywords: [
      'register',
      'how can i register',
      'enroll',
      'admission',
      'apply',
      'how to join',
      'booking',
      'seat reservation',
    ],
    response:
      'To register for training or book a flight mission:\n\n1. Submit your details through our instant online intake form\n2. An admissions or operations flight coordinator will contact you within 2 hours\n3. Complete slot verification and receive batch onboarding materials.',
    action: {
      type: 'enquiry',
      label: 'Proceed to Registration',
      payload: 'DGCA Pilot Training Registration',
    },
  },
  {
    id: 'pricing',
    keywords: [
      'price',
      'pricing',
      'cost',
      'fees',
      'fee structure',
      'how much',
      'rate',
      'rates',
      'charges',
      'estimate',
    ],
    response:
      'Transparent Pricing Overview:\n\n• DGCA Small Category Pilot Certification: ₹24,999 (Special student fee: ₹18,999)\n• DGCA Medium Category Pilot Training: ₹49,999\n• Advanced FPV / Cinematography Masterclass: ₹32,000\n• GIS & LiDAR Photogrammetry Program: ₹38,000\n• Commercial Survey / Shoot Day Rate: Custom quote based on acreage, sensor payload & location.',
    action: {
      type: 'enquiry',
      label: 'Get Detailed Fee Structure',
      payload: 'Fee Structure & Quotation Details',
    },
  },
  {
    id: 'contact',
    keywords: [
      'contact',
      'how can i contact',
      'phone',
      'email',
      'office',
      'location',
      'address',
      'reach out',
      'call',
      'headquarters',
    ],
    response:
      'You can reach DroneTV Aero through our direct communication channels:\n\n📍 Headquarters: Aerotech Hub, Sector 62, Noida, NCR, India\n📧 Operations: support@dronetv.in | Admissions: admissions@dronetv.in\n📞 Phone: +91 98765 43210 (Mon-Sat, 9:00 AM - 7:00 PM IST)\n🌐 Digital Airspace Relay: Online 24/7',
    action: {
      type: 'enquiry',
      label: 'Submit Contact Enquiry',
      payload: 'General Enquiry',
    },
  },
  {
    id: 'speak_to_someone',
    keywords: [
      'speak to someone',
      'talk to human',
      'representative',
      'agent',
      'call me',
      'support agent',
      'human',
      'advisor',
      'consultant',
      'counselor',
    ],
    response:
      'I can immediately schedule a callback from a DroneTV Senior Flight Operations Director or Academy Counselor. Please share your phone number and preferred time through our fast intake desk.',
    action: {
      type: 'enquiry',
      label: 'Request Immediate Callback',
      payload: 'Direct Flight Advisor Callback',
    },
  },
];

export const FALLBACK_RESPONSE =
  "I couldn't find an exact match for that question. You can choose from our predefined quick topics above, ask about DGCA pilot certification, course fees, eligibility, aerial survey services, or submit an enquiry to speak with an operations advisor directly.";

export function matchChatIntent(input: string): {
  response: string;
  action?: { type: 'enquiry' | 'navigate'; label: string; payload?: string };
} {
  const normalized = input.toLowerCase().trim();

  for (const intent of CHAT_INTENTS) {
    const isMatched = intent.keywords.some((kw) =>
      normalized.includes(kw.toLowerCase())
    );
    if (isMatched) {
      return {
        response: intent.response,
        action: intent.action,
      };
    }
  }

  return {
    response: FALLBACK_RESPONSE,
    action: {
      type: 'enquiry',
      label: 'Submit an Enquiry',
      payload: 'General Enquiry',
    },
  };
}

