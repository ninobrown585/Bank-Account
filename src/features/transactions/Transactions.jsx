import { useState } from "react";

import { transfer, withdrawal, deposit, selectBalance } from "./transactionsSlice";
import { useSelector, useDispatch } from "react-redux";
import "./transactions.scss";

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  
  const dispatch = useDispatch();
  // TODO: Get the balance from the Redux store using the useSelector hook
  const balance = useSelector(selectBalance);

  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState("");

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {
    e.preventDefault();
    
    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".
    const action = e.nativeEvent.submitter.name;
    console.log(action)

    const amount =+ parseFloat(amountStr);
    console.log(amount)

    // TODO: Dispatch the appropriate transaction action based on `action`
    if (action === "deposit") {
      
      // The `deposit` action is dispatched with a payload containing
      // the amount and the recipient.
      dispatch(deposit({ amount }));
    }
    if (action === "withdrawal") {
      // The `withdrawal` action is dispatched with a payload containing
      // the amount and the recipient.
      dispatch(withdrawal({ amount }));
    }
    if (action === "transfer") {
      // The `transfer` action is dispatched with a payload containing
      // the amount and the recipient.
      dispatch(transfer({ amount, recipient }));
    }
  };

  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={(e) => setAmountStr(e.target.value)}
            />
          </label>
          <div>
            <button name="deposit">
              Deposit
            </button>
            <button name="withdrawal">Withdraw</button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input
              placeholder="Recipient Name"
              name="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <button name="transfer">Transfer</button>
        </div>
      </form>
    </section>
  );
}
