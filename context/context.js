import { createContext } from "react";

const Context = createContext(
  {
    draft: null,
    pins: [],
    currentPin: null,
  }
);

export default Context;
