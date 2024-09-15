import React from "react";
import "./SelectRecipients.css";
import { IoMdArrowDropright } from "react-icons/io";
interface Recipient {
  email: string;
  domain: string;
}

interface SelectedRecipientsProps {
  selectedRecipients: Recipient[];
  removeRecipient: (email: string) => void;
  removeAllRecipients: (domain: string) => void;
}

const SelectRecipients: React.FC<SelectedRecipientsProps> = ({
  selectedRecipients,
  removeRecipient,
  removeAllRecipients,
}) => {
  const groupedRecipients = {
    "Company Recipients": selectedRecipients.filter(
      (r) => r.domain !== "gmail.com"
    ),
    "Email Recipients": selectedRecipients.filter(
      (r) => r.domain === "gmail.com"
    ),
  };

  return (
    <div className="selected-recipients">
      <h2>Selected Recipients</h2>
      <div className="recipient-group">
        <div
          className="group-header"
          onClick={() => removeAllRecipients("company")}
        >
          <IoMdArrowDropright />
          Company Recipients
        </div>
        <ul>
          {groupedRecipients["Company Recipients"].map((recipient) => (
            <li
              key={recipient.email}
              onClick={() => removeRecipient(recipient.email)}
            >
              {recipient.email}
            </li>
          ))}
        </ul>
      </div>
      <div className="recipient-group">
        <div className="group-header">
          <IoMdArrowDropright />
          Email Recipients
        </div>
        <ul>
          {groupedRecipients["Email Recipients"].map((recipient) => (
            <li
              key={recipient.email}
              onClick={() => removeRecipient(recipient.email)}
            >
              {recipient.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectRecipients;
