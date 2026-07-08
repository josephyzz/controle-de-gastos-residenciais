import React from "react";

interface ButtonProps {
  children: React.ReactNode; // conteúdo dentro do botão (texto, ícones, etc)
  onClick?: (e: any) => void; // ação ao clicar
  type?: "button" | "submit" | "reset"; // tipo de botão
  className?: string;
  isPending?: boolean; // indica estado de carregamento
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  isPending = false,
}) => {
  // Evita clique enquanto está "pending"
  const handleClick = (e: any) => {
    if (!isPending && onClick) onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={isPending} // evita múltiplos envios e muda cursor
      className={`cursor-pointer
        font-semibold px-5 py-2 rounded-2xl w-fit shadow-md 
        transition-all duration-300 ease-out hover:scale-95 flex items-center justify-center gap-2
        bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] italic text-white
        ${isPending ? "opacity-75 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {isPending ? (
        <>
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>Carregando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
