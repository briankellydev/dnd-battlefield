import { Character } from './character';

export interface CellState {
    character?: Character;
    color?: string;
    isReadyToBeMovedInto?: boolean;
    id?: number;
    roomId?: string;
}

export interface Room {
    name: string;
    sizeX: number;
    sizeY: number;
    id: string;
}
