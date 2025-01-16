import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { articleService } from '../services/articleService';

const MAX_ARTICLES = 100;

const Articles: React.FC = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, error } =
    useInfiniteQuery({
      queryKey: ['articles'],
      queryFn: ({ pageParam }) => articleService.getArticles(pageParam),
      getNextPageParam: (_, pages) => {
        const loadedArticles = pages.flat().length;
        return loadedArticles < MAX_ARTICLES ? pages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div className="text-center py-8">Ładowanie artykułów...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">Wystąpił błąd podczas ładowania artykułów</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Artykuły</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.pages.map((page) =>
          page.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.body.slice(0, 100)}...</p>
              <Link to={`/articles/${article.id}`} className="text-blue-600 hover:text-blue-800">
                Czytaj więcej →
              </Link>
            </article>
          )),
        )}
      </div>
      {isFetchingNextPage && (
        <div className="text-center py-4">Ładowanie kolejnych artykułów...</div>
      )}
      {!hasNextPage && (
        <div className="text-center py-4 text-gray-600">
          Nie ma więcej artykułów do wyświetlenia
        </div>
      )}
    </div>
  );
};

export default Articles;
