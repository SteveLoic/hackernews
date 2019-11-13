import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../firebase";
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = useContext(AuthContext);
  const [filter, setFilter] = useState("");
  const [filteredLinks, setFilteredLink] = useState([]);
  const [links, setLinks] = useState([]);

  const handleSearchFilter = event => {
    event.preventDefault();
    const query = filter.toLocaleLowerCase();
    const matchedLinks = links.filter(link => {
      return (
        link.description.toLocaleLowerCase().includes(query) ||
        link.url.toLocaleLowerCase().includes(query) ||
        link.postedBy.name.toLocaleLowerCase().includes(query)
      );
    });

    setFilteredLink(matchedLinks);
  };

  const getInitialLink = () => {
    firebase.db
      .collection("links")
      .get()
      .then(snapshot => {
        const links = snapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() };
        });

        setLinks(links);
      });
  };

  useEffect(() => {
    getInitialLink();
  }, []);

  return (
    <div>
      <form onSubmit={handleSearchFilter}>
        <div>
          Search <input onChange={event => setFilter(event.target.value)} />
          <button>OK</button>
        </div>
      </form>
      {filteredLinks.map((filteredLink, index) => (
        <LinkItem
          key={filteredLink.id}
          showCount={false}
          link={filteredLink}
          index={index}
        />
      ))}
    </div>
  );
}

export default SearchLinks;
