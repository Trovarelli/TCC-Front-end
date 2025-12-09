import Image from 'next/image';

interface EmptyStateProps {
  title: string;
  description?: string;
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  image = '/img/not-found.jpg',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex justify-center items-center flex-col py-16 px-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
        <Image
          src={image}
          width={280}
          height={280}
          alt={title}
          className="relative opacity-80 mix-blend-multiply"
        />
      </div>

      <h3 className="text-2xl font-bold text-gray-800 mb-3 text-center">
        {title}
      </h3>

      {description && (
        <p className="text-gray-600 text-center max-w-md leading-relaxed mb-6">
          {description}
        </p>
      )}

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-primary group"
        >
          {actionLabel}
          <svg
            className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

