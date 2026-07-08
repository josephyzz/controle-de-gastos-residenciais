import { useParams } from "react-router-dom";
import { useTransactionData } from "../hooks/useTransactionData";

function TransactionPage() {
  const { personId } = useParams<{ personId: string }>();
  const id = personId ? Number(personId) : undefined;
  const { transactions } = useTransactionData(id);


  return (
    <div>{transactions.data}</div>


  );
}

export default TransactionPage;
