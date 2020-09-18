import { CellState } from '../interfaces/cell-state';

export const MOCK_CHARACTERS: CellState[] = [
    {
        character: {
            name: 'Darth Vader', baseMovement: 20, currentPosition: [0, 2], player: 'John', initiativeScore: 5
        },
        color: 'red'
    },
    {
        character: {
            name: 'Luke Skywalker', baseMovement: 10, currentPosition: [5, 5], player: 'Jane', initiativeScore: 6
        },
        color: 'blue'
    }
];
