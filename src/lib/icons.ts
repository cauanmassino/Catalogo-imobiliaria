import {
  Waves,
  Dumbbell,
  UtensilsCrossed,
  Baby,
  ShieldCheck,
  Sun,
  Bike,
  PartyPopper,
  ArrowUpDown,
  PawPrint,
  TrainFront,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Route,
  ShoppingCart,
  type LucideIcon,
} from 'lucide-react';

// Ícones de amenidades (lazer/infraestrutura do prédio)
export const amenityIcons: Record<string, LucideIcon> = {
  pool: Waves,
  gym: Dumbbell,
  gourmet: UtensilsCrossed,
  playground: Baby,
  security: ShieldCheck,
  solar: Sun,
  bike: Bike,
  party: PartyPopper,
  elevator: ArrowUpDown,
  pet: PawPrint,
};

// Ícones de pontos de interesse próximos
export const nearbyIcons: Record<string, LucideIcon> = {
  transit: TrainFront,
  school: GraduationCap,
  hospital: HeartPulse,
  mall: ShoppingBag,
  road: Route,
  market: ShoppingCart,
};
