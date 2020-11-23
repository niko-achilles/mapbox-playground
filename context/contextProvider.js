import Context from "./context";
import reducer from "./reducer";
import React from "react";

const ContextProvider = ({ children }) => {
  const initialState = React.useContext(Context);
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
