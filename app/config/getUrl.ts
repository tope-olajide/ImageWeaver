const BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://image-weaver.azurewebsites.net/api'
  : 'http://localhost:7071/api'; // 

const url = {
  broadcast: `${BASE_URL}/broadcast`,
  createTournament: `${BASE_URL}/createtournament`,
  joinTournament: `${BASE_URL}/jointournament`,
  negotiate: `${BASE_URL}/negotiate`,
    updateLevel: `${BASE_URL}/updatelevel`,
    saveGameData: `${BASE_URL}/saveGameData`,
  fetchGameData: `${BASE_URL}/fetchGameData`,
  fetchHighScores: `${BASE_URL}/fetchHighScores`,
};


export default url;