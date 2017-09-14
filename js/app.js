import Game from './game';

const g = new Game();

const resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click', () => {
  g.reset();
});
