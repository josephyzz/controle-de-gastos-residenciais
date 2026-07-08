import { Decimal } from "decimal.js";
// Função para converter Decimal e numero de moeda BR
export function formatCurrency(value: Decimal): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value.toNumber());
}
