const ApiUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const MakeGame = async () => {
  await fetch(
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

const addScore = async (gameIndex, name, score) => {
  await fetch(
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

const GetScores = async (gameIndex) => fetch(`${ApiUrl}/games/${gameIndex}/scores`).then((response) => response.json());

export default { MakeGame, addScore, GetScores };