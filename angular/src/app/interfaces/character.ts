export interface Character {
    name: string;
    baseMovement: number;
    currentPosition: number[];
    initiativeScore: number;
    initiativeRoll?: number;
    player: string;
    clientId?: string;
    color?: string;
}