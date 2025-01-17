import packageJson from '../../package.json';

interface TechnicalInfoProps {
  className?: string;
}

export const TechnicalInfo = ({ className }: TechnicalInfoProps) => {
  const environment = import.meta.env.VITE_APP_ENV || 'development';
  const version = packageJson.version;

  return (
    <div
      className={`fixed bottom-2 right-2 bg-gray-800 text-white p-2 rounded-md text-sm ${className}`}
    >
      <div>Środowisko: {environment}</div>
      <div>Wersja: {version}</div>
    </div>
  );
};
