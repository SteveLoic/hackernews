import React, { useContext } from "react";
import { AuthContext } from "../../firebase";
import useFormValidation from "./../Auth/useFormValidation";
import validateCreateLink from "./../Auth/validateCreateLink";

const INITIAL_STATE = {
  description: "",
  url: "",
};

function CreateLink(props) {
  const { firebase, user } = useContext(AuthContext);
  const handleCreateLink = () => {
    if (!user) {
      props.history.push("/login");
    } else {
      const { url, description } = values;
      const newLink = {
        url,
        description,
        postedBy: {
          id: user.uid,
          name: user.displayName,
        },
        votesCount: 0,
        votes: [],
        comments: [],
        created: Date.now(),
      };

      firebase.db.collection("links").add(newLink);
      props.history.push("/");
    }
  };
  const { handleSubmit, handleChange, values, errors } = useFormValidation(
    INITIAL_STATE,
    validateCreateLink,
    handleCreateLink
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-column mt3">
      <input
        name="description"
        placeholder="A description for your link"
        autoComplete="off"
        value={values.description}
        onChange={handleChange}
        type="text"
        className={errors.description && "error-input"}
      />
      {errors.description && <p className="error-text">{errors.description}</p>}
      <input
        name="url"
        placeholder="The url for your link"
        autoComplete="off"
        value={values.url}
        onChange={handleChange}
        type="url"
        className={errors.url && "error-input"}
      />
      {errors.url && <p className="error-text">{errors.url}</p>}
      <button className="button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CreateLink;
