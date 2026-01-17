import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  file02,
  homeSmile,
  notification2,
  notification3,
  notification4,
  notion,
  plusSquare,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  twitter,
  facebook,
  instagram,
  driveLogo,
  gmailLogo,
  hubspotLogo,
  trelloLogo,
  sheetsLogo,
  whatsappLogo,
  telegramLogo,
  airtableLogo,
  clickup,
  salesforceLogo,
  shopifyLogo,
  asanaLogo,
  microsoftTeamsLogo,
  mailchimpLogo,
  openaiLogo,
  googleCalendarLogo,
  metaLogo,
  geminiLogo,
  anthropicLogo,
} from "@/public/assets";

export const navigation = [
  {
    id: "0",
    title: "services",
    url: "#ai-services",
  },
  {
    id: "1",
    title: "packages",
    url: "#bundles",
  },
  {
    id: "2",
    title: "howItWorks",
    url: "#implementation",
  },
  {
    id: "3",
    title: "contact",
    url: "#contact",
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [
  gmailLogo,
  driveLogo,
  hubspotLogo,
  trelloLogo,
  sheetsLogo,
  salesforceLogo,
  shopifyLogo,
  slack,
  notion,
  asanaLogo,
  microsoftTeamsLogo,
  whatsappLogo,
  telegramLogo,
  airtableLogo,
  clickup,
  openaiLogo,
  googleCalendarLogo,
  metaLogo,
  geminiLogo,
  anthropicLogo,
];

export const flowkoServices = [
  "Automated client intake and follow-ups",
  "Smart document generation and billing",
  "Intelligent scheduling and communication",
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "Connect your favorite business tools and create powerful automations that save 20+ hours per week. We handle all the technical complexity for you.";

export const collabContent = [
  {
    id: "0",
    title: "Connect 1000+ Business Apps",
    text: "From Salesforce to Shopify, Slack to Stripe - automate workflows across all your tools.",
  },
  {
    id: "1",
    title: "Enterprise-Grade Automation",
    text: "We design and implement custom workflows tailored to your business processes and requirements.",
  },
  {
    id: "2",
    title: "Real-Time Data Sync",
    text: "Keep all your apps synchronized automatically. No more manual data entry or copy-paste.",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "Salesforce",
    icon: salesforceLogo,
    width: 49,
    height: 34,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Microsoft Teams",
    icon: microsoftTeamsLogo,
    width: 37,
    height: 34,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Google Drive",
    icon: driveLogo,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Shopify",
    icon: shopifyLogo,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Asana",
    icon: asanaLogo,
    width: 37,
    height: 34,
  },
  {
    id: "7",
    title: "Mailchimp",
    icon: mailchimpLogo,
    width: 34,
    height: 34,
  },
];


export const benefits = [
  {
    id: "0",
    title: "Save 20+ Hours Weekly",
    text: "Automate routine tasks so you can focus on what truly drives growth",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Scale Without Headaches",
    text: "Handle 10x more customers with the same team size",
    backgroundUrl: "assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Zero Human Errors",
    text: "Perfect consistency in every process, every single time",
    backgroundUrl: "assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "24/7 Instant Responses",
    text: "Never miss a customer inquiry, even at 3 AM",
    backgroundUrl: "assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "ROI Within 30 Days",
    text: "Start saving money immediately with proven automation systems",
    backgroundUrl: "assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "Competitive Advantage",
    text: "AI insights that help you stay two steps ahead",
    backgroundUrl: "assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  // {
  //   id: "0",
  //   title: "X",
  //   iconUrl: twitter,
  //   url: "https://x.com/flowko_io",
  // },
  {
    id: "1",
    title: "Facebook",
    iconUrl: facebook,
    url: "https://www.facebook.com/profile.php?id=61586148998419",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com/flowko.io/",
  },
];
