const size = 4;
let tiles = [];

const shuffleBtn = document.querySelector('#shuffle');
const container = document.querySelector('#container');

const get = (k, d) => JSON.parse(localStorage.getItem(`tracker-${k}`)) ?? d;
const set = (k, v) => localStorage.setItem(`tracker-${k}`, JSON.stringify(v));

const create = e => {
    container.innerHTML = '';
    tiles = [];
    for (let i = 1; i <= size * size; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (i === size * size) {
            tile.classList.add('empty');
        } else {
            tile.textContent = i;
        }
        tiles.push(tile);
        container.appendChild(tile);
    }
};

const shuffle = e => {
    const numbers = [...Array(size * size - 1).keys()].map(x => x + 1);
    numbers.push(null);
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    apply(numbers);
};

const apply = numbers => {
    tiles.forEach((tile, index) => {
        if (numbers[index] === null) {
            tile.classList.add('empty');
            tile.textContent = '';
        } else {
            tile.classList.remove('empty');
            tile.textContent = numbers[index];
        }
    });
};

const handle = e => {
    const tile = e.target;
    if (!tile.classList.contains('empty')) {
        const emptyTile = tiles.find(t => t.classList.contains('empty'));
        const tileIndex = tiles.indexOf(tile);
        const emptyIndex = tiles.indexOf(emptyTile);
        const validMoves = [emptyIndex - 1, emptyIndex + 1, emptyIndex - size, emptyIndex + size];
        if (validMoves.includes(tileIndex)) {
            [tiles[tileIndex].textContent, tiles[emptyIndex].textContent] = [tiles[emptyIndex].textContent, tiles[tileIndex].textContent];
            tiles[tileIndex].classList.toggle('empty');
            tiles[emptyIndex].classList.toggle('empty');
        }
    }
};

document.addEventListener('DOMContentLoaded', e => {
    create();
    shuffle();
    container.addEventListener('click', handle);
    shuffleBtn.addEventListener('click', shuffle);
});