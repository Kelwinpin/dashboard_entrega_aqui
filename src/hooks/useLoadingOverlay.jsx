/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import Loader from '@/components/loader';

const LoadingOverlay = ({
  open = false,
  onClose,
  text = "Carregando...",
  variant = "spinner",
  size = "lg",
  showText = true,
  preventClose = false,
  className,
  overlayClassName,
  ...props
}) => {
  useEffect(() => {
    if (open) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [open]);

  // Fecha overlay com ESC (se permitido)
  useEffect(() => {
    if (!open || preventClose) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose, preventClose]);

  if (!open) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !preventClose) {
      onClose?.();
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "animate-in fade-in-0 duration-200",
        "bg-background/80 backdrop-blur-sm",
        overlayClassName
      )}
      onClick={handleBackdropClick}
      {...props}
    >
      <div className={cn(
        "animate-in zoom-in-95 duration-200",
        className
      )}>
        <Loader
          variant={variant}
          size={size}
          text={text}
          showText={showText}
        />
      </div>
    </div>
  );
};

const useLoadingOverlay = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);

  const showLoading = React.useCallback(() => setIsLoading(true), []);
  const hideLoading = React.useCallback(() => setIsLoading(false), []);
  const toggleLoading = React.useCallback(() => setIsLoading(prev => !prev), []);

  return {
    isLoading,
    showLoading,
    hideLoading,
    toggleLoading,
    setIsLoading
  };
};

export { useLoadingOverlay, LoadingOverlay };