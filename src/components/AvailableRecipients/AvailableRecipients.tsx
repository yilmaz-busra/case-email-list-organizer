import React, { useState } from "react";
import { groupBy } from "lodash";
import "./AvailableRecipients.css";
import { CiSearch } from "react-icons/ci";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
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
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  const filteredRecipients = recipients.filter((recipient) =>
    recipient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedRecipients = groupBy(filteredRecipients, "domain");

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
  };

  const toggleDomain = (domain: string) => {
    if (expandedDomain === domain) {
      setExpandedDomain(null);
    } else {
      setExpandedDomain(domain);
      if (domain !== "gmail.com") {
        const domainRecipients = recipients.filter((r) => r.domain === domain);
        addRecipient(domainRecipients);
      }
    }
  };

  return (
    <div className="available-recipients">
      <h2>Available Recipients</h2>
      <div className="search-container">
        <CiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleEmailInput(searchTerm);
              setSearchTerm("");
            }
          }}
        />
      </div>
      {Object.entries(groupedRecipients)
        .filter(([domain]) => domain !== "gmail.com")
        .map(([domain, domainRecipients]) => (
          <div key={domain}>
            <h3 onClick={() => toggleDomain(domain)}>
              {expandedDomain === domain ? (
                <IoMdArrowDropdown />
              ) : (
                <IoMdArrowDropright />
              )}{" "}
              {domain}
            </h3>
            {expandedDomain === domain && (
              <ul>
                {domainRecipients.map((recipient, index) => (
                  <li key={index} onClick={() => addRecipient(recipient)}>
                    {recipient.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

      <div>
        <ul>
          {groupedRecipients["gmail.com"]?.map((recipient, index) => (
            <li key={index} onClick={() => addRecipient(recipient)}>
              {recipient.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default AvailableRecipients;
