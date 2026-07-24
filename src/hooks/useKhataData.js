import { useState, useCallback } from 'react'
import { customers as initialCustomers, transactions as initialTransactions } from '../data/mockData'


export function useKhataData() {
  const [customerList, setCustomerList] = useState(initialCustomers)
  const [transactionList, setTransactionList] = useState(initialTransactions)

  const addTransaction = useCallback((tx) => {
    const newTx = { id: `t${Date.now()}`, status: 'pending', ...tx }
    setTransactionList((prev) => [newTx, ...prev])
    if (tx.type === 'credit') {
      setCustomerList((prev) =>
        prev.map((c) =>
          c.id === tx.customerId
            ? { ...c, balance: c.balance + Number(tx.amount), status: 'pending', lastActivity: tx.date }
            : c
        )
      )
    } else {
      setCustomerList((prev) =>
        prev.map((c) =>
          c.id === tx.customerId
            ? {
                ...c,
                balance: Math.max(0, c.balance - Number(tx.amount)),
                status: c.balance - Number(tx.amount) <= 0 ? 'paid' : 'pending',
                lastActivity: tx.date,
              }
            : c
        )
      )
    }
    return newTx
  }, [])

  return { customerList, transactionList, addTransaction }
}
