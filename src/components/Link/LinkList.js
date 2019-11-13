import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../firebase";

import LinkItem from "./LinkItem";

function LinkList(props) {
  const { firebase } = useContext(AuthContext);
  const [links, setLinks] = useState([]);
  const isNewPage = props.location.pathname.includes("new");

  const handleSnapshot = snapshot => {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
    setLinks(links);
  };

  const getLinks = () => {
    firebase.db
      .collection("links")
      .orderBy("created", "desc")
      .onSnapshot(handleSnapshot);
  };
  const renderLinks = () => {
    if (isNewPage) {
      return links;
    }
    const topLinks = links
      .slice()
      .sort((l1, l2) => l2.votes.length - l1.votes.length);
    return topLinks;
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      {renderLinks().map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
