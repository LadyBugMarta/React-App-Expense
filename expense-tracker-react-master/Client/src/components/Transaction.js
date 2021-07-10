import React, { useContext, useRef } from 'react'
import { GlobalContext } from '../context/globalState'

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext)
  const sign = transaction.amount < 0 ? '-' : '+'
  const transactionLabel = useRef(null)

  const deleteLabel = (id) => {
    let transactions = JSON.parse(window.localStorage.transactions)
    console.log(transactions)

    let filtered = transactions.filter((value, index, arr) => {
      return id !== value['id']
    })
    console.log('filtered: ', filtered)
    localStorage.setItem('transactions', JSON.stringify(filtered))
    // transactionLabel.current.remove()
    deleteTransaction(id)
  }

  return (
    <li ref={transactionLabel} className={transaction.amount < 0 ? 'minus' : 'plus'}>
      {transaction.text} <span>{sign}{Math.abs(transaction.amount)} $</span>
      <button
        onClick={() => deleteLabel(transaction.id)}
        className="delete-btn"
      >x</button>
    </li>
  )
}
