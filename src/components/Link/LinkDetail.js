import React, { useEffect, useState, useContext } from "react";
import distanceInWordsToNow from "date-fns/distance_in_words_to_now";
import { AuthContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkDetail(props) {
  const { firebase, user } = useContext(AuthContext);
  const linkId = props.match.params.linkId;
  const [link, setLink] = useState(null);
  const [commentText, setCommentText] = useState(null);
  const linkRef = firebase.db.collection("links").doc(linkId);

  const getLink = () => {
    linkRef.get().then(doc => {
      setLink({ ...doc.data(), id: doc.id });
    });
  };

  const handleAddComment = () => {
    if (!user) {
      props.history.push("/login");
    } else {
      console.log(user.displayName);
      linkRef.get().then(doc => {
        if (doc.exists) {
          const prevouisComments = doc.data().comments;
          const comment = {
            postedBy: {
              id: user.uid,
              name: user.displayName,
              created: Date.now(),
              text: commentText,
            },
          };
          const updatedComments = [...prevouisComments, comment];
          linkRef.update({ comments: updatedComments });
          setLink(prevState => ({
            ...prevState,
            comments: updatedComments,
          }));
          setCommentText("");
        }
      });
    }
  };

  useEffect(() => {
    getLink();
  }, []);

  return !link ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <LinkItem showCount={false} link={link} />
      <textarea
        rows="6"
        cols="60"
        onChange={event => setCommentText(event.target.value)}
      />
      <div>
        <button className="button" onClick={handleAddComment}>
          Add comment
        </button>
      </div>

      {link.comments.map((comment, index) => (
        <div key={index}>
          {
            <p className="comment-author">
              {comment.postedBy.name}|{distanceInWordsToNow(
                comment.postedBy.created
              )}
            </p>
          }
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}

export default LinkDetail;
