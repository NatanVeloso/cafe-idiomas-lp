import { Globe, MessageCircle, Sparkles, type LucideIcon } from 'lucide-react';
import { copy } from '../../variant';

export const heroChips: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Globe, ...copy.heroChip },
  { icon: MessageCircle, title: 'Foco em conversação', desc: 'Destrave sua fala com confiança' },
  { icon: Sparkles, title: 'Aulas personalizadas', desc: 'Conteúdo adaptado aos seus objetivos' },
];
