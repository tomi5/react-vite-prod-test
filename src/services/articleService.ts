import axios from 'axios';
import { Article } from '../types/article';

const API_URL = 'https://jsonplaceholder.typicode.com';
const ITEMS_PER_PAGE = 10;

export const articleService = {
  getArticles: async (page: number): Promise<Article[]> => {
    const { data } = await axios.get<Article[]>(`${API_URL}/posts`, {
      params: {
        _page: page,
        _limit: ITEMS_PER_PAGE,
      },
    });
    return data;
  },

  getArticleById: async (id: number): Promise<Article | undefined> => {
    try {
      const { data } = await axios.get<Article>(`${API_URL}/posts/${id}`);
      return data;
    } catch (error) {
      return undefined;
    }
  },
};
