import React from "react";

const BlogPostPagination = () => {
  return (
    <div className="blog-post-pagination text-center">
      <a className="prev" href="#">
        <i className="fa fa-angle-left"></i>
      </a>
      {Array.from(Array(5)).map((_, i) => (
        <a key={i} className={i ? "" : "active"} href="#">
          0{i + 1}
        </a>
      ))}
      <a className="next" href="#">
        <i className="fa fa-angle-right"></i>
      </a>
    </div>
  );
};

export default BlogPostPagination;
