import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Strona główna</h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Witaj na stronie głównej naszej aplikacji!
      </p>
      <p className="text-lg text-gray-600 leading-relaxed">Sprawdzam działanie PRów</p>
      <p className="text-lg text-gray-600 leading-relaxed">Should block merge</p>
    </div>
  );
};

export default Home;
