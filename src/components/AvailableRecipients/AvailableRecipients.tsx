import React, { useState } from "react";
import "./AvailableRecipients.css";
import { groupBy } from "lodash";

interface Recipient {
  email: string;
  domain: string;
}

interface AvailableRecipientsProps {
  addRecipient: (recipient: Recipient | Recipient[]) => void;
}

const AvailableRecipients: React.FC<AvailableRecipientsProps> = ({
  addRecipient,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recipients, setRecipients] = useState<Recipient[]>([
    { email: "mehmet@posteffect.ai", domain: "posteffect.ai" },
    { email: "mert@posteffect.ai", domain: "posteffect.ai" },
    { email: "natali@posteffect.ai", domain: "posteffect.ai" },
    { email: "hilal@posteffect.ai", domain: "posteffect.ai" },
    { email: "muhammed@gmail.com", domain: "gmail.com" },
    { email: "ugur@gmail.com", domain: "gmail.com" },
    { email: "furkan@gmail.com", domain: "gmail.com" },
    { email: "batin@gmail.com", domain: "gmail.com" },
  ]);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.email.includes(searchTerm)
  );

  const groupedRecipients = groupBy(filteredRecipients, "domain");

  const handleDomainSelect = (domain: string) => {
    const domainRecipients = recipients.filter((r) => r.domain === domain);
    addRecipient(domainRecipients);
  };

  const handleEmailInput = (email: string) => {
    if (isValidEmail(email)) {
      const domain = email.split("@")[1];
      const newRecipient = { email, domain };
      setRecipients([...recipients, newRecipient]);
      addRecipient(newRecipient);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredSuggestions = recipients
      .filter(
        (r) =>
          r.email.toLowerCase().includes(value.toLowerCase()) ||
          r.domain.toLowerCase().includes(value.toLowerCase())
      )
      .map((r) => r.email);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (email: string) => {
    const recipient = recipients.find((r) => r.email === email);
    if (recipient) {
      addRecipient(recipient);
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  return (
    <div className="available-recipients">
      <h2>Available Recipients</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEmailInput(searchTerm);
              setSearchTerm("");
              setSuggestions([]);
            }
          }}
        />
        {suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      {Object.entries(groupedRecipients).map(([domain, domainRecipients]) => (
        <div key={domain}>
          {domain !== "gmail.com" && (
            <h3 onClick={() => handleDomainSelect(domain)}>{domain}</h3>
          )}
          <ul>
            {domainRecipients.map((recipient, index) => (
              <li key={index} onClick={() => addRecipient(recipient)}>
                {recipient.email}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default AvailableRecipients;
