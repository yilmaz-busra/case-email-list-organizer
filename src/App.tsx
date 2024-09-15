import React, { useState } from "react";

import "./App.css";
import AvailableRecipients from "./components/AvailableRecipients/AvailableRecipients";
import SelectRecipients from "./components/SelectRecipients/SelectRecipients";

interface Recipient {
  email: string;
  domain: string;
}

const App: React.FC = () => {
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);

  const addRecipient = (recipient: Recipient | Recipient[]) => {
    if (Array.isArray(recipient)) {
      setSelectedRecipients((prev) => [
        ...prev,
        ...recipient.filter((r) => !prev.some((p) => p.email === r.email)),
      ]);
    } else {
      setSelectedRecipients((prev) =>
        prev.some((r) => r.email === recipient.email)
          ? prev
          : [...prev, recipient]
      );
    }
  };

  const removeRecipient = (email: string) => {
    setSelectedRecipients((prev) =>
      prev.filter((recipient) => recipient.email !== email)
    );
  };

  const removeAllRecipients = (type: string) => {
    if (type === "company") {
      setSelectedRecipients((prev) =>
        prev.filter((recipient) => recipient.domain === "gmail.com")
      );
    }
  };

  return (
    <div className="app-container">
      <AvailableRecipients addRecipient={addRecipient} />
      <SelectRecipients
        selectedRecipients={selectedRecipients}
        removeRecipient={removeRecipient}
        removeAllRecipients={removeAllRecipients}
      />
    </div>
  );
};

export default App;
