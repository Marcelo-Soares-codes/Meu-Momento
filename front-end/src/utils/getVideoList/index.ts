import axios from 'axios';

export async function getVideosList(): Promise<string[]> {
  try {
    const response = await axios.get('http://localhost:5000/videoslist');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter lista de vídeos:', error);
    return []; // Retornando um array vazio em caso de erro
  }
}
