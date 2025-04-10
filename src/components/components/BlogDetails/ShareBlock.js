import React from "react";

const ShareBlock = ({ tags = [], share = [] }) => {
  return (
    <div className="share-block">
      <div className="left-block">
        <p>
          Tags:{" "}
          {tags.map((tag, i) => (
            <a key={i} href="#">
              {tag},{" "}
            </a>
          ))}
        </p>
      </div>
      <div className="social-block">
        {share.map((icon, i) => (
          <a key={i} href="#">
            <i className={icon}></i>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ShareBlock;
