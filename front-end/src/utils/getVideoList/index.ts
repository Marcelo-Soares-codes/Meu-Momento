import axios from 'axios';
import Cookies from 'js-cookie';

export async function getVideosList(arenaId: string): Promise<string[]> {
  try {
    const token = Cookies.get('@Auth:token');
    const response = await axios.get(
      `http://localhost:5000/arena/${arenaId}/videos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error('Erro ao obter lista de vídeos:', error);
    return []; // Retornando um array vazio em caso de erro
  }
}
