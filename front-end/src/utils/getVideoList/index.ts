import Cookies from 'js-cookie';
import { api } from '../../services/api';

export async function getVideosList(arenaId: string): Promise<string[]> {
  try {
    const token = Cookies.get('@Auth:token');
    const response = await api.get(`/arena/${arenaId}/videos`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Erro ao obter lista de vídeos:', error);
    return []; // Retornando um array vazio em caso de erro
  }
}
