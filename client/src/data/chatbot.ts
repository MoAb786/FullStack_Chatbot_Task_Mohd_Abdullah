import type { ChatIntent } from '../types';

export const INITIAL_BOT_MESSAGE = {
  id: 'welcome-1',
  sender: 'bot' as const,
  text: "Hello! I'm DroneTV's AI Support & Lead Assistant. I can assist you with DGCA pilot training, aerial cinematography, drone survey services, and course admissions. How can I help you today?",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
};

export const QUICK_PROMPTS = [
  'What services does DroneTV provide?',
  'What courses / training are available?',
  'I am a student.',
  'I am interested in a service.',
  'How can I register?',
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
      'cinematography',
      'mapping',
      'survey',
      'agriculture',
      'inspection',
      'surveillance',
      'drone work',
      'offerings',
    ],
    response:
      'DroneTV provides specialized UAV solutions across India:\n\n• High-Altitude Aerial Cinematography & FPV\n• GIS Mapping & 3D Photogrammetry\n• Precision Agriculture Spraying & Crop Health Analysis\n• Industrial & Infrastructure Inspection (Bridges, Towers, Solar)\n• Custom Drone Engineering & R&D\n\nWould you like to enquire about a specific service for your project?',
    action: {
      type: 'enquiry',
      label: 'Submit Service Enquiry',
      payload: 'High-Altitude Aerial Cinematography',
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
      'dgca',
      'rpc',
      'certification',
      'learn drone',
      'pilot certificate',
      'drone school',
      'academy',
    ],
    response:
      'We offer DGCA-approved Drone Pilot Certification & technical training programs:\n\n1. DGCA Remote Pilot Certification (Small Category - up to 25kg)\n2. DGCA Medium Category Pilot Training (25kg - 150kg)\n3. Aerial Cinematography & FPV Masterclass\n4. GIS Surveying & Photogrammetry Specialization\n5. Drone Assembly, Maintenance & Firmware Engineering\n\nBatches start every month with hands-on flight simulator and field training.',
    action: {
      type: 'enquiry',
      label: 'Register Course Interest',
      payload: 'DGCA Remote Pilot Certification (Small Category)',
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
      'Welcome! We offer special student discounts, university workshop tie-ups, and project guidance for engineering students. You can enroll in our DGCA Pilot Training or join our Hardware & Firmware Engineering workshops.',
    action: {
      type: 'enquiry',
      label: 'Student Enquiry Form',
      payload: 'DGCA Pilot Training (Student Discount)',
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
      'We would be happy to partner with you! Our operations team provides certified pilots, DGCA-compliant drones, dual-operator setups, and post-processing deliverables tailored to your requirements.',
    action: {
      type: 'enquiry',
      label: 'Request Service Quote',
      payload: 'Aerial Survey & Mapping Service',
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
    ],
    response:
      'To register for training or book a commercial service:\n\n1. Fill out our online enquiry form with your contact details\n2. Our admissions/operations coordinator will reach out within 24 hours\n3. Complete verification and slot reservation.',
    action: {
      type: 'enquiry',
      label: 'Proceed to Registration',
      payload: 'DGCA Pilot Training Registration',
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
    ],
    response:
      'You can reach DroneTV through:\n\n📍 Headquarters: Aerotech Hub, Sector 62, Noida, NCR, India\n📧 Email: support@dronetv.in / admissions@dronetv.in\n📞 Phone: +91 98765 43210 (Mon-Sat, 9:00 AM - 7:00 PM IST)\n\nYou can also submit an instant enquiry below.',
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
    ],
    response:
      'I can connect you directly with a DroneTV aviation advisor. Please provide your contact information through our quick enquiry form, and our representative will call you back promptly.',
    action: {
      type: 'enquiry',
      label: 'Request Callback',
      payload: 'Advisor Callback Request',
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
    ],
    response:
      'Our DGCA Remote Pilot Certification starts from ₹24,999 (special student discounts available). Commercial aerial shoots and GIS survey pricing depend on acreage, flight duration, and sensor payload. Submit an enquiry to receive a transparent quotation.',
    action: {
      type: 'enquiry',
      label: 'Get Price Quotation',
      payload: 'Pricing & Fee Structure Details',
    },
  },
];

export const FALLBACK_RESPONSE =
  "I couldn't find a direct match for that question. You can ask me about DroneTV services, DGCA pilot training courses, student discounts, registration, or submit an enquiry to speak with an advisor directly.";

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
