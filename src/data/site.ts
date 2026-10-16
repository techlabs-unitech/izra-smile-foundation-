import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  BriefcaseBusiness,
  Building2,
  Carrot,
  HandHeart,
  HandHelping,
  Heart,
  HeartHandshake,
  PawPrint,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type SupportArea = {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

export type Initiative = {
  category: string;
  title: string;
  description: string;
  image: string;
};

export type GalleryItem = {
  src: string;
  alt: string;
  title: string;
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Vision", href: "#vision" },
  { label: "Our Work", href: "#support" },
  { label: "Programs", href: "#programs" },
  { label: "Impact", href: "#impact" },
  { label: "Gallery", href: "#gallery" },
  { label: "Get Involved", href: "#involved" },
  { label: "Contact", href: "#contact" },
];

export const supportAreas: SupportArea[] = [
  {
    title: "Children & Education",
    description:
      "Supporting access to learning, care, and the basic conditions children need to grow with confidence.",
    icon: BookOpen,
    image: "/images/notebooks-children.jpg",
  },
  {
    title: "Women & Single Mothers",
    description:
      "Offering practical, empathetic support to women, girls and families — including hygiene essentials and day-to-day needs.",
    icon: Users,
    image: "/images/nirmal-sanstha-pads.jpg",
  },
  {
    title: "Women Empowerment",
    description:
      "Supporting women by promoting dignity, confidence, opportunities, and greater participation in community life.",
    icon: HeartHandshake,
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.09 AM.jpeg",
  },
  {
    title: "People with Disabilities",
    description:
      "Promoting inclusion, care, and practical support so that every individual can live with dignity.",
    icon: HandHelping,
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.08 AM.jpeg",
  },
  {
    title: "Healthcare & Cancer Support",
    description:
      "Standing with individuals and families as they navigate medical needs, care, and recovery.",
    icon: Stethoscope,
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.11 AM.jpeg",
  },
  {
    title: "Vulnerable Families",
    description:
      "Assisting families facing hardship with care rooted in empathy, responsibility, and social support.",
    icon: ShieldCheck,
    image: "/images/shelter-little-girl.jpg",
  },
  {
    title: "Elderly Care",
    description:
      "Caring for senior citizens with shelter, nutritious food, medical support and the companionship they deserve.",
    icon: Heart,
    image: "/images/old-age-home.jpg",
  },
  {
    title: "Slum Education",
    description:
      "Supporting children in underserved communities by creating access to education, learning opportunities, and a better foundation for their future.",
    icon: Carrot,
    image: "/images/notebooks-volunteers.jpg",
  },
  {
    title: "Animal Welfare",
    description:
      "Extending compassion toward street animals by supporting their basic welfare and care.",
    icon: PawPrint,
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.11 AM (1).jpeg",
  },
];

export const values = [
  { title: "Compassion", description: "Caring for people with empathy and humanity.", icon: HeartHandshake },
  { title: "Dignity", description: "Recognizing the worth of every individual.", icon: Heart },
  { title: "Responsibility", description: "Acting with care and accountability in service of others.", icon: BriefcaseBusiness },
  { title: "Transparency", description: "Building trust through honest and thoughtful action.", icon: Building2 },
  { title: "Community Participation", description: "Creating change through collective action and shared responsibility.", icon: HandHeart },
];

export const initiatives: Initiative[] = [
  {
    category: "Shelter & Rescue",
    title: "Shelters in Bengaluru",
    description:
      "Our two shelters at Penia and Majestic in Bengaluru care for 175 mentally disabled children, 50 senior citizens and 10 girls who survived sexual abuse. We rescue them from police stations and railway stations and provide food, education, medical support and daily essentials.",
    image: "/images/shelter-little-girl.jpg",
  },
  {
    category: "Health & Hygiene",
    title: "Hygiene & Dignity Drive",
    description:
      "Distributing sanitary pads and hygiene essentials to girls and women at partner shelters, so that every girl can manage her health with dignity and confidence.",
    image: "/images/nirmal-sanstha-pads.jpg",
  },
  {
    category: "Elderly Care",
    title: "Care for Our Elders",
    description:
      "Spending time with, celebrating and caring for elderly residents at old age homes — because senior citizens deserve warmth, respect and belonging.",
    image: "/images/old-age-home.jpg",
  },
  {
    category: "Education",
    title: "Notebooks & Learning Kits",
    description:
      "Handing out notebooks, pencils and study material to children in underserved communities so they can keep learning and dream bigger.",
    image: "/images/notebooks-volunteers.jpg",
  },
  {
    category: "Joy & Celebration",
    title: "Gifts & Smiles for Children",
    description:
      "Bringing gifts, treats and festive moments to children in need, because every child deserves to feel celebrated.",
    image: "/images/gift-boxes-children.jpg",
  },
  {
    category: "Community Support",
    title: "Essential Care & Daily Needs",
    description:
      "Thoughtful support for families and individuals facing hardship through practical assistance and compassionate action.",
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.04 AM.jpeg",
  },
  {
    category: "Education & Care",
    title: "Children & Learning Support",
    description:
      "Promoting a safe and supportive environment where children can access the care and opportunities they deserve.",
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.07 AM (1).jpeg",
  },
  {
    category: "Health & Welfare",
    title: "Healthcare & Recovery Support",
    description:
      "Walking alongside people facing illness, disability, or medical challenges with empathy and practical care.",
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.11 AM.jpeg",
  },
  {
    category: "Community Action",
    title: "Collective Social Participation",
    description:
      "Encouraging communities to come together and contribute toward dignity, welfare, and meaningful change.",
    image: "/images/WhatsApp Image 2026-10-01 at 9.37.32 AM.jpeg",
  },
];

export const galleryItems: GalleryItem[] = [
  { src: "/images/izra-banner-girls.jpg", alt: "Izra Smile Foundation team with girls and donated supplies at a shelter", title: "Supplies for the shelter" },
  { src: "/images/shelter-little-girl.jpg", alt: "A smiling little girl having a meal at the shelter", title: "Daily care at the shelter" },
  { src: "/images/nirmal-sanstha-pads.jpg", alt: "Girls and volunteers holding sanitary pad packs at Nirmal Sanstha", title: "Hygiene & dignity" },
  { src: "/images/notebooks-children.jpg", alt: "Children sitting together holding new notebooks", title: "Notebooks for learning" },
  { src: "/images/notebooks-volunteers.jpg", alt: "Volunteers with children holding notebooks and pencils", title: "Learning kits distribution" },
  { src: "/images/gift-boxes-children.jpg", alt: "Children and volunteers holding gift boxes", title: "Gifts & smiles" },
  { src: "/images/old-age-home.jpg", alt: "Elderly women and volunteers gathered outside an old age home", title: "Time with our elders" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.04 AM.jpeg", alt: "Women in the foundation community support gathering", title: "Community care" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.05 AM (1).jpeg", alt: "Women actively participating in foundation activities", title: "Women support" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.06 AM.jpeg", alt: "Women and families holding support material", title: "Family support" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.07 AM (1).jpeg", alt: "Children learning and gathering in a classroom", title: "Learning support" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.09 AM (1).jpeg", alt: "Group of children together in a community setting", title: "Youth care" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.12 AM.jpeg", alt: "Schoolbag distribution and support initiative", title: "Essential support" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.32 AM.jpeg", alt: "Women holding support items together in a community scene", title: "Collective action" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.06 AM (2).jpeg", alt: "Volunteers and children gathered for a social care event", title: "Community engagement" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.11 AM.jpeg", alt: "Women taking part in a social welfare program", title: "Health and dignity" },
  { src: "/images/WhatsApp Image 2026-10-01 at 9.37.09 AM.jpeg", alt: "Children gathered in a support and learning environment", title: "Care and learning" },
];

export type ImpactStat = {
  value: number;
  suffix: string;
  label: string;
};

export const impactStats: ImpactStat[] = [
  { value: 10000, suffix: "+", label: "People Supported" },
  { value: 50, suffix: "+", label: "Health Camps" },
  { value: 25000, suffix: "+", label: "Meals Served" },
  { value: 2, suffix: "", label: "Shelters in Bengaluru" },
  { value: 175, suffix: "", label: "Mentally Disabled Children in Our Care" },
  { value: 50, suffix: "", label: "Senior Citizens in Our Care" },
  { value: 10, suffix: "", label: "Girls Rescued & Protected" },
];

export const shelterStory = {
  intro:
    "In Bengaluru we run two shelters, at Penia and Majestic. We rescue people in need from police stations and railway stations and take care of them at our shelters, looking after their daily needs — food, education, medical support and other daily essentials.",
  locations: ["Penia", "Majestic"],
  needs: ["Food", "Education", "Medical support", "Daily essentials"],
};

export const visionPillars = [
  "Children",
  "Women & single mothers",
  "Elderly people",
  "People with disabilities",
  "People facing serious illnesses",
  "Vulnerable communities",
  "Street animals",
  "Community participation",
];

export const contactDetails = {
  address: "RZQ-210, Ground Floor, Khasra No. 33/16,\nNihal Vihar, Lucky Garden, Nangloi,\nNew Delhi – 110041",
  phone: "7068670845",
  email: "izrasmilefoundation@gmail.com",
  instagramHandle: "@izrasmile_foundation",
  instagramUrl: "https://www.instagram.com/izrasmile_foundation/",
};
