const ApiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const MakeGame = () => {
  fetch(
    `${ApiUrl}games/`, {
      method: 'POST',
      body: JSON.stringify({
        name: "franklin's new game",
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('Game Index', data.result.split(' ')[3]);
    });
};

const addScore = (gameIndex, name, score) => {
  fetch(
    `${ApiUrl}/games/${gameIndex}/scores`,
    {
      method: 'POST',
      body: JSON.stringify({
        user: name,
        score,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then((response) => response.json());
};

const GetScores = (gameIndex) => fetch(`${ApiUrl}/games/${gameIndex}/scores`).then((response) => response.json());

export default { MakeGame, addScore, GetScores };