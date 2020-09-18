import { Character } from './character';

export interface CellState {
    character?: Character;
    color?: string;
    isReadyToBeMovedInto?: boolean;
}