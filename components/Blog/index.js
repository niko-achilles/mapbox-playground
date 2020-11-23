import React from "react";

import Context from "../../context/context";
import NoContent from "./parts/noContent";
import CreateContent from "./parts/createContent";
import WithContent from "./parts/withContent";

const Blog = () => {
  const { state } = React.useContext(Context);
  const { draft, currentPin } = state;

  let BlogContent;
  if (!draft && !currentPin) {
    BlogContent = NoContent;
  } else if (draft && !currentPin) {
    BlogContent = CreateContent;
  } else if (!draft && currentPin) {
    BlogContent = WithContent;
  }

  return (
    <div>
      <BlogContent />
      <style jsx>{`
        div {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Blog;
