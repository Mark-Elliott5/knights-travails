const generateMoves = () => {
    debugger;
    const moves = [];
    const validateSquare = (x, y) => {
        if ((x < 0) || (y < 0) || (x > 7) || (y > 7)) {
            return null;
        }
        const square = ((y * 8) + x)
        return square;
    }

    const getSquares = (num) => {
        const x = ((num)%8);
        const y = Math.floor((num)/8);
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
    let path = [];
    let current;
    const visited = [];
    const queue = [];
    const moveList = generateMoves();
    queue.push(Square(endNumber, moveList[endNumber]));
    let parent;

    while (queue.length) {
        current = queue.shift();
        for (let i = 0; i < current.moves.length; i++) {
            if (visited.includes(current.moves[i])) {
                continue;
            }
            if (current.moves[i] === startNumber) {
                const obj = Square(current.moves[i], moveList[current.moves[i]], parent);
                path.push(obj);
                return path;
            } 
            parent = current;
            queue.push(Square(current.moves[i], moveList[current.moves[i]], parent))
            visited.push(current.moves[i]);
        }
    }
    // return visited;


    console.log(`Here's your path:`)
}

const recursiveFunc = (input) => {
    
}

const Square = (value, moves, parent = null) => {
    return { value, moves, parent }
}