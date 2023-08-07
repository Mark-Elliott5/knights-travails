const Square = (value, moves, parent = null) => {
    return { value, moves, parent }
}

const getCoord = (square) => {
    const x = ((square)%8);
    const y = Math.floor((square)/8);
    return [x,y];
}

const generateMoves = () => {
    const moves = [];

    const getSquares = (num) => {
        const [x, y] = getCoord(num);
        const positions = [
            [x+1, y+2],
            [x+2, y+1],
            [x+2, y-1],
            [x+1, y-2],
            [x-1, y-2],
            [x-2, y-1],
            [x-2, y+1],
            [x-1, y+2],
        ];

        const validateSquare = (x, y) => {
            if ((x < 0) || (y < 0) || (x > 7) || (y > 7)) {
                return null;
            }
            const square = ((y * 8) + x)
            return square;
        }

        return positions.map(([x,y]) => validateSquare(x, y));
    }

    for (let i = 0; i < 64; i++) {
        const squares = getSquares(i);
        moves.push(squares.filter((v) => v != null))
    }
    return moves;
}

const knightMoves = (start, end) => {
    const endNumber = ((end[1] * 8) + end[0]);
    const startNumber = ((start[1] * 8) + start[0]);
    const paths = [];
    let current;
    const visited = [];
    const queue = [];
    const moveList = generateMoves();
    queue.push(Square(endNumber, moveList[endNumber]));

    while (queue.length) {
        current = queue.shift();
        for (let i = 0; i < current.moves.length; i++) {
            if (visited.includes(current.moves[i])) {
                continue;
            }
            const obj = Square(current.moves[i], moveList[current.moves[i]], current);
            queue.push(obj);
            if (current.moves[i] === startNumber) {
                paths.push(obj);
            } else {
            visited.push(current.moves[i]);
            }
        }
    }

    const getPaths = (path) => {
        const coordinates = [];
        let current = path;
        while (current) {
            coordinates.push(getCoord(current.value));
            current = current.parent;
        }
        return coordinates;
    }

    const outputPaths = [];
    for (path of paths) {
        outputPaths.push(getPaths(path));
    }

    const getShortestPath = (input) => {
        let string = '';
        for (path of input) {
            string += `[${path}]\n`;
        }
        return string;
    }

    console.log(`Here's your shortest path: \n${getShortestPath(outputPaths[0])}`);
    return outputPaths;
}
