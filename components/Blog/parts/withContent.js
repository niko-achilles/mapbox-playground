import Context from "../../../context/context";
import React from "react";

const WithContent = () => {
  const { state } = React.useContext(Context);

  const { title, text } = state.currentPin;

  return (
    <div className="with-content">
      <h3>{title}</h3>
      <p>{text}</p>
      <style jsx>
        {`
          .with-content {
            padding-top: 10rem;
            width: 100%;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
};

export default WithContent;
