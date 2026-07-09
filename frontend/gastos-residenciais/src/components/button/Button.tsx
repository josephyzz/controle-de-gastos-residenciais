import React from "react";

interface ButtonProps {
  children: React.ReactNode; // conteúdo dentro do botão (texto, ícones, etc)
  onClick?: (e: any) => void; // ação ao clicar
  type?: "button" | "submit" | "reset"; // tipo de botão
  className?: string; // Caso seja preciso estilização por fora
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  // Função para lidar com o click
  const handleClick = (e: any) => {
    if (onClick) onClick(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`cursor-pointer
        font-semibold px-5 py-2 rounded-2xl w-fit shadow-md 
        transition-all duration-300 ease-out hover:scale-95 flex items-center justify-center gap-2
        bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] italic text-white
        ${className}
      `}
    >
      {children}
    </button>
  );
};
