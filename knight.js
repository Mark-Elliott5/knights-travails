const generateMoves = () => {
    debugger;
    const moves = [];
    const validate = (x, y) => {
        if ((x < 0) || (y < 0) || (x > 7) || (y > 7)) {
            return null;
        }
        const square = ((y * 8) + x)
        return square;
    }

    const getMoves = (num) => {
        const x = ((num)%8);
        const y = Math.floor((num)/8);
        const posOne = validate(...[x+1, y+2]);
        const posTwo = validate(...[x+2, y+1]);
        const posThree = validate(...[x+2, y-1]);
        const posFour = validate(...[x+1, y-2]);
        const posFive = validate(...[x-1, y-2]);
        const posSix = validate(...[x-2, y-1]);
        const posSeven = validate(...[x-2, y+1]);
        const posEight = validate(...[x-1, y+2]);
        return [
            posOne, 
            posTwo, 
            posThree, 
            posFour, 
            posFive, 
            posSix, 
            posSeven, 
            posEight
        ];
    }
    for (let i = 0; i < 64; i++) {
        const squares = getMoves(i);
        moves.push(squares.filter((v) => v != null))
    }
    return moves;
}