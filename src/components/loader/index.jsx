import React from 'react';
import { cn } from '@/lib/utils';

const Loader = ({ 
  size = "default", 
  variant = "dots",
  className,
  text = "",
  showText = true 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  const SpinnerLoader = () => (
    <div className="relative">
      <div className={cn(
        "border-4 border-muted rounded-full animate-spin",
        "border-t-primary border-r-primary/60 border-b-primary/30 border-l-transparent",
        sizeClasses[size]
      )} />
      <div className={cn(
        "absolute inset-0 border-4 border-transparent rounded-full animate-pulse",
        "border-t-primary/20",
        sizeClasses[size]
      )} />
    </div>
  );

  const DotsLoader = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-primary rounded-full animate-bounce",
            size === "sm" ? "w-2 h-2" : size === "lg" ? "w-4 h-4" : size === "xl" ? "w-5 h-5" : "w-3 h-3"
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );

  const PulseLoader = () => (
    <div className="relative flex items-center justify-center">
      <div className={cn(
        "bg-primary/20 rounded-full animate-ping absolute",
        sizeClasses[size]
      )} />
      <div className={cn(
        "bg-primary rounded-full animate-pulse",
        size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : size === "xl" ? "w-10 h-10" : "w-6 h-6"
      )} />
    </div>
  );

  const BarsLoader = () => (
    <div className="flex items-end space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-primary animate-pulse",
            size === "sm" ? "w-1 h-4" : size === "lg" ? "w-2 h-8" : size === "xl" ? "w-3 h-10" : "w-1.5 h-6"
          )}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return <DotsLoader />;
      case "pulse":
        return <PulseLoader />;
      case "bars":
        return <BarsLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-4",
      className
    )}>
      {renderLoader()}
      {showText && (
        <div className="text-center">
          <p className={cn(
            "font-medium text-muted-foreground animate-pulse",
            size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : size === "xl" ? "text-xl" : "text-base"
          )}>
            {text}
          </p>
        </div>
      )}
    </div>
  );
};

export default Loader;