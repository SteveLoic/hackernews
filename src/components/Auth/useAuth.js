import { useEffect, useState } from "react";

import firebase from "../../firebase/index";

function useAuth() {
  const [authUser, setAuthUser] = useState(null);
  useEffect(() => {
    const unsubcribe = firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubcribe();
  }, []);
  return authUser;
}

export default useAuth;
