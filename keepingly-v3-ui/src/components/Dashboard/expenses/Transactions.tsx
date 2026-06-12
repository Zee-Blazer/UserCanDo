
import React, { useEffect, useState } from "react";
import TransactionsCard from "@/components/Dashboard/expenses/TransactionsCard";

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN ||"";

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token }),
        });
        const data = await res.json();
        if (res.ok) {
          setTransactions(data?.transactions);
        } else {
          console.error("Error fetching transactions:", data.error);
        }
      } catch (err) {
        console.error("Error:", err);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, [access_token]);

  const id = "1234";

  return (
    <div className="p-4">
      <TransactionsCard transactions={transactions} loading={loading} renovationId={id} />
    </div>
  );
};

export default TransactionsPage;
