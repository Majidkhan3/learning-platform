import React from "react";
import SidebarPosts from "./SidebarPosts";

const BlogDetailsSidebar = ({ posts = [], categories = [], tags = [] }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("search"));
  };

  return (
    <div className="sidebar">
      <div className="sidebar__single sidebar__search">
        <form onSubmit={handleSubmit} className="sidebar__search-form">
          <input type="text" name="search" placeholder="Search here..." />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <SidebarPosts posts={posts} />
      <div className="sidebar__single sidebar__category">
        <h3 className="sidebar__title">Categories</h3>
        <ul className="sidebar__category-list">
          {categories.map((category, i) => (
            <li key={i} className="sidebar__category-list-item">
              <a href="#">{category}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar__single sidebar__tags">
        <h3 className="sidebar__title">Tags</h3>
        <ul className="sidebar__tags-list">
          {tags.map((tag, i) => (
            <li key={i} className="sidebar__tags-list-item me-1">
              <a href="#">{tag}, </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogDetailsSidebar;
