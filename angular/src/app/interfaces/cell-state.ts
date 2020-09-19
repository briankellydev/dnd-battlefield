import { Character } from './character';

export interface CellState {
    character?: Character;
    color?: string;
    isReadyToBeMovedInto?: boolean;
    id?: number;
}

export interface Room {
    name: string;
    sizeX: number;
    sizeY: number;
}