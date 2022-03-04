import './style.css';
// import {GetScores, MakeGame, addScore} from './APIdata';
import APIdata from './APIdata.js';

const Scores = document.querySelector('.scores-list');
const Form = document.querySelector('.fomr');
const refreshBtn = document.querySelector('#refresh-btn');
let gameIndex;

const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const render = async (gameIndex) => {
  // clearElement(Scores);
  Scores.innerHTML = '';
  const data = await APIdata.GetScores(gameIndex);
  data.result.forEach((element) => {
    const li = document.createElement('li');
    const span1 = document.createElement('span');
    span1.classList.add('name-span');

    const span2 = document.createElement('span');
    span2.classList.add('score-span');

    span1.innerHTML = element.user;
    span2.innerHTML = element.score;

    li.appendChild(span1);
    li.appendChild(span2);
    Scores.appendChild(li);
  });
};

const Storage = localStorage.getItem('Game Index');
if (!Storage) {
  APIdata.MakeGame().then(() => {
    gameIndex = localStorage.getItem('Game Index');
  });
} else {
  gameIndex = localStorage.getItem('Game Index');
  render(gameIndex);
}

Form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (Form.name.value === '' || Form.score.value === null) return;
  APIdata.addScore(gameIndex, Form.name.value, Form.score.value);
  render(gameIndex);
  clearElement(Scores);
});

refreshBtn.addEventListener('click', () => {
  render(gameIndex);
  clearElement(Scores);
});