interface ButtonProps {
  onClick?: () => void;
  children: preact.ComponentChildren;
  variant?: "primary" | "secondary";
}

export function Button({ onClick, children, variant = "primary" }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded";
  const variantStyles = variant === "primary" 
    ? "bg-blue-500 text-white" 
    : "bg-gray-200 text-gray-800";

  return (
    <button 
      class={`${baseStyles} ${variantStyles}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
