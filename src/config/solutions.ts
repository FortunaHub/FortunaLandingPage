import type { LucideIcon } from 'lucide-react';
import { Layers } from 'lucide-react';

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
    name: 'Fortuna for Kubernetes',
    tagline: 'Kubernetes Security & Risk Management',
    to: '/',
    icon: Layers,
  },
];
