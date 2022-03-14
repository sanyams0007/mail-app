import MailBody from "./MailBody";
import MailList from "./MailList";
import { useState } from "react";

export default function Landing({ query }) {
  const [id, setId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = (id) => {
    setId(id);
    setIsVisible(true);
  };

  return (
    <div className="container flex">
      <MailList
        handleClick={handleClick}
        query={query}
        setIsVisible={setIsVisible}
      />
      {isVisible && id && <MailBody id={id} />}
    </div>
  );
}
