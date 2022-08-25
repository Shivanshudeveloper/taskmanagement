import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import firebase from "../lib/firebase";
import { API_SERVICE } from "src/config";
import { useRouter } from "next/router";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === "AUTH_STATE_CHANGED") {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

export const AuthContext = createContext({
  ...initialState,
  platform: "Firebase",
  createUserWithEmailAndPassword: () => Promise.resolve(),
  signInWithEmailAndPassword: () => Promise.resolve(),
  signInWithGoogle: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const AuthProvider = (props) => {
  const { children } = props;
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    () =>
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          console.log(user);
          // Here you should extract the complete user profile to make it available in your entire app.
          // The auth state only provides basic information.
          // if (sessionStorage.first || sessionStorage.last || sessionStorage.contact) {
          //   firebase
          //     .auth()
          //     .currentUser.updateProfile({
          //       displayName: `${sessionStorage.first} ${sessionStorage.last}`,
          //     })
          //     .then(() => {
          //       console.log(`Profile updated!`, firebase.auth().currentUser);
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //     });
          // }

          const { first, last, contact } = sessionStorage;

          try {
            const response = await fetch(`${API_SERVICE}/add_user`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: user.uid,
                userType: "user",
                first: first || "",
                last: last || "",
                contact: contact || "",
              }),
            });
            if (response.status === 200) {
              console.log("User data added");
              const userData = await response.json();
              dispatch({
                type: "AUTH_STATE_CHANGED",
                payload: {
                  isAuthenticated: true,
                  user: {
                    id: user.uid,
                    avatar: user.photoURL,
                    email: user.email,
                    name: user.displayName,
                    userData,
                    plan: "Premium",
                  },
                },
              });
              sessionStorage.setItem("userId", user.uid);

              try {
                const response = await fetch(`${API_SERVICE}/get_user/${user.uid}`, {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                });
          
                if(response.status === 200){
                  const userData = await response.json();
                  // console.log(userData);
                  // console.log(userData, "hiiii");
                  if(userData.userType === "user"){
                    router.push("/tasksAssigned");
                  }
                  else {
                    router.push("/dashboard")
                  }
                }
                
              } catch (error) {
                console.log(error);
              }

              
            }
          } catch (err) {
            console.log(err);
          }
        } else {
          dispatch({
            type: "AUTH_STATE_CHANGED",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      }),
    [dispatch]
  );

  const signInWithEmailAndPassword = (email, password) =>
    firebase.auth().signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase.auth().signInWithPopup(provider);
  };

  const createUserWithEmailAndPassword = async (email, password) =>
    firebase.auth().createUserWithEmailAndPassword(email, password);

  const logout = async () => {
    await firebase.auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Firebase",
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
