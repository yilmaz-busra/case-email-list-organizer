import React, { useState } from "react";

import "./App.css";
import AvailableRecipients from "./components/AvailableRecipients/AvailableRecipients";

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

  return (
    <div className="app-container">
      <AvailableRecipients addRecipient={addRecipient} />
    </div>
  );
};

export default App;
