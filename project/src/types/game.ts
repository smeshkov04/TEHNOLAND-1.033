export type GameScreen = 'intro' | 'mascots' | 'elements' | 'lore' | 'dashboard';

export type MascotId = 'constructor' | 'manager' | 'programmer';

export interface Mascot {
  id: MascotId;
  image: string;
  name: string;
  dialogue: string;
}

export interface Element {
  id: string;
  name: string;
  nameRu: string;
  icon: string;
  color: string;
  glowColor: string;
  problem: string;
}
