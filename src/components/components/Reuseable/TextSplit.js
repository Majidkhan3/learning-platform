import React, { Fragment } from "react";

const TextSplit = ({ text = "", separator = "\n", children = "" }) => {
  const newText = children || text;
  const arr = newText.split(separator);
  const lastIndex = arr.length - 1;

  return (
    <Fragment>
      {arr.map((t, i) => (
        <Fragment key={i}>
          {t.trim()} {i !== lastIndex && <br />}
        </Fragment>
      ))}
    </Fragment>
  );
};

export default TextSplit;
