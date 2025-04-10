import React from "react";
import { Image } from "react-bootstrap";

const SidebarPosts = ({ posts = [] }) => {
  return (
    <div className="sidebar__single sidebar__post">
      <h3 className="sidebar__title">Latest Posts</h3>
      <div className="sidebar__post-wrap">
        {posts.map(({ id, title, image }) => (
          <div key={id} className="sidebar__post__single">
            <div className="sidebar__post-image">
              <div className="inner-block">
                <Image
                  src={require(`src/assets/images/${image}`).default.src}
                  alt="Awesome Image"
                />
              </div>
            </div>
            <div className="sidebar__post-content">
              <h4 className="sidebar__post-title">
                <a href="#">{title}</a>
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarPosts;
