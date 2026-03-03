import type { LucideIcon } from 'lucide-react';
import { Layers, Cloud, Shield, Zap } from 'lucide-react';

export interface Solution {
  id: string;
  name: string;
  tagline: string;
  to: string;
  icon: LucideIcon;
  comingSoon?: boolean;
}

export const SOLUTIONS: Solution[] = [
  {
    id: 'fortuna-k8s',
    name: 'FortunaK8s',
    tagline: 'Kubernetes Security & Risk Management',
    to: '/',
    icon: Layers,
  },
  {
    id: 'fortuna-cloud',
    name: 'FortunaCloud',
    tagline: 'Cloud-native security posture management',
    to: '/',
    icon: Cloud,
    comingSoon: true,
  },
  {
    id: 'fortuna-shield',
    name: 'FortunaShield',
    tagline: 'Workload protection and compliance',
    to: '/',
    icon: Shield,
    comingSoon: true,
  },
  {
    id: 'fortuna-pulse',
    name: 'FortunaPulse',
    tagline: 'Real-time threat detection and response',
    to: '/',
    icon: Zap,
    comingSoon: true,
  },
];
