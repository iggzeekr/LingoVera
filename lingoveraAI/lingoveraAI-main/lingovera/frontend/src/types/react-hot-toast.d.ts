declare module 'react-hot-toast' {
  export const Toaster: React.FC<{
    position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  }>;
  
  export const toast: {
    (message: string): string;
    success(message: string): string;
    error(message: string): string;
    loading(message: string): string;
    dismiss(toastId?: string): void;
  };
} 