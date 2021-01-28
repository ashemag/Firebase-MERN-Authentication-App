import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <>
      <CircularProgress
        style={{
          margin: "auto",
          display: "block",
          color: "black",
        }}
      />
    </>
  );
};

export default Loader;
