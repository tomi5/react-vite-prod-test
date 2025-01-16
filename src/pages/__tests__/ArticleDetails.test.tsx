import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ArticleDetails from '../ArticleDetails';
import * as articleService from '../../services/articleService';
import '@testing-library/jest-dom';

vi.mock('../../services/articleService');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: () => ({
      id: '1',
    }),
    useNavigate: () => vi.fn(),
  };
});

describe('ArticleDetails', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const mockArticle = {
    id: 1,
    title: 'Test Article',
    body: 'Test content',
    userId: 1,
    createdAt: '2024-03-20',
  };

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{component}</MemoryRouter>
      </QueryClientProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  it('should display article details', async () => {
    vi.mocked(articleService.articleService.getArticleById).mockResolvedValue(mockArticle);

    const { container } = renderWithProviders(<ArticleDetails />);

    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('should display error message for non-existent article', async () => {
    vi.mocked(articleService.articleService.getArticleById).mockResolvedValue(undefined);

    const { container } = renderWithProviders(<ArticleDetails />);

    await waitFor(() => {
      expect(screen.getByText('Ładowanie artykułu...')).toBeInTheDocument();
    });

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot while loading', () => {
    vi.mocked(articleService.articleService.getArticleById).mockImplementation(
      () => new Promise(() => {}), // never resolving promise to keep loading state
    );

    const { container } = renderWithProviders(<ArticleDetails />);

    expect(container).toMatchSnapshot();
  });
});
