import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  discord,
  figma,
  file02,
  framer,
  homeSmile,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  twitter,
  driveLogo,
  gmailLogo,
  hubspotLogo,
  trelloLogo,
  sheetsLogo,
  whatsappLogo,
  telegramLogo,
  airtableLogo,
} from "@/public/assets";

export const navigation = [
  {
    id: "0",
    title: "solutions",
    url: "#services",
  },
  {
    id: "1",
    title: "benefits",
    url: "#features",
  },
  {
    id: "2",
    title: "WebsiteBundles",
    url: "#bundles",
  },
  {
    id: "3",
    title: "process",
    url: "#process",
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
  discord,
  figma,
  slack,
  notion,
  raindrop,
  protopie,
  whatsappLogo,
  telegramLogo,
  airtableLogo,
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
    text: "From Slack to Google Sheets, Discord to Notion - automate workflows across all your tools.",
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
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
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
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
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
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Jumpstart",
    description: "Perfect for getting started with automation",
    price: "2200",
    features: [
      "Up to 3 custom workflows",
      "Comprehensive training & documentation",
      "1-2 week delivery timeline",
      "Email support included",
    ],
  },
  {
    id: "1",
    title: "Growth",
    description: "Ideal for scaling businesses",
    price: "550",
    features: [
      "10 development hours per month",
      "Monthly optimization sprints",
      "Email & chat support",
      "Performance monitoring included",
    ],
  },
  {
    id: "2",
    title: "Scale",
    description: "For enterprise-level automation needs",
    price: "1100",
    features: [
      "20 development hours per month",
      "Priority SLA & dedicated support",
      "Quarterly strategy reviews",
      "Advanced analytics dashboard",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Save Time",
    text: "Reclaim 15+ hours per week by automating repetitive tasks and manual processes that slow down your team.",
    backgroundUrl: "assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Scale Efficiently",
    text: "Grow your business without proportionally increasing headcount through intelligent workflow automation.",
    backgroundUrl: "assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Reduce Errors",
    text: "Eliminate human error with automated data transfers and consistent process execution across your organization.",
    backgroundUrl: "assets/benefits/card-3.svg",
    iconUrl: benefitIcon3,
    imageUrl: benefitImage2,
  },
  {
    id: "3",
    title: "Fast Implementation",
    text: "Get your automations up and running in 1-2 weeks with our sprint-style delivery approach.",
    backgroundUrl: "assets/benefits/card-4.svg",
    iconUrl: benefitIcon4,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "4",
    title: "ROI Focused",
    text: "Every automation is designed with measurable time and cost savings, ensuring clear return on investment.",
    backgroundUrl: "assets/benefits/card-5.svg",
    iconUrl: benefitIcon1,
    imageUrl: benefitImage2,
  },
  {
    id: "5",
    title: "24/7 Monitoring",
    text: "Automated health checks and real-time alerts ensure your workflows run smoothly around the clock.",
    backgroundUrl: "assets/benefits/card-6.svg",
    iconUrl: benefitIcon2,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "X",
    iconUrl: twitter,
    url: "https://x.com/flowko_io",
  },
];
