import React from "react";
import { FaCcMastercard, FaCcPaypal, FaCcApplePay } from "react-icons/fa";

function PaymentCards() {
  return (
    <div>
      <ul className="flex gap-3">
        <li>
          <FaCcMastercard size="30" />
        </li>
        <li>
          <FaCcPaypal size="30" />
        </li>
        <li>
          <FaCcApplePay size="30" />
        </li>
      </ul>
    </div>
  );
}

export default PaymentCards;
