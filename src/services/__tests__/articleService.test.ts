import { describe, it, expect, vi, beforeEach } from 'vitest';
import { articleService } from '../articleService';
import { Article } from '../../types/article';
import axios from 'axios';

vi.mock('axios');

describe('articleService', () => {
  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Test Article 1',
      body: 'Test content 1',
      userId: 1,
    },
    {
      id: 2,
      title: 'Test Article 2',
      body: 'Test content 2',
      userId: 2,
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getArticles should return list of articles', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockArticles });
    const articles = await articleService.getArticles(1);
    expect(Array.isArray(articles)).toBe(true);
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty('id');
    expect(articles[0]).toHaveProperty('title');
    expect(articles[0]).toHaveProperty('body');
  });

  it('getArticleById should return specific article', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockArticles[0] });
    const article = await articleService.getArticleById(1);
    expect(article).toBeDefined();
    expect(article?.id).toBe(1);
    expect(article).toHaveProperty('title');
    expect(article).toHaveProperty('body');
  });

  it('getArticleById should return undefined for non-existent ID', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce(new Error('Not found'));
    const article = await articleService.getArticleById(999);
    expect(article).toBeUndefined();
  });
});
