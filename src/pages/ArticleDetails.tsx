import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { articleService } from '../services/articleService';

const ArticleDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['article', id],
    queryFn: () => articleService.getArticleById(Number(id)),
  });

  useEffect(() => {
    if (error) {
      navigate('/articles');
    }
  }, [error, navigate]);

  if (isLoading) {
    return <div className="text-center py-8">Ładowanie artykułu...</div>;
  }

  if (error || !article) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <Link to="/articles" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Wróć do listy artykułów
      </Link>
      <article className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="prose max-w-none">
          {article.body.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default ArticleDetails;
