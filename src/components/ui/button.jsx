import React from 'react';

export const Button = React.forwardRef(({ 
  className = '',
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props 
}, ref) => {
  const Comp = asChild ? 'span' : 'button';
  
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors';
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
  };
  const sizeStyles = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8'
  };
  
  return (
    <Comp
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';