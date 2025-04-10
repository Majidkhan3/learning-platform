import blogOne from "@/data/blogOne";
import useActive from "@/hooks/useActive";
import React from "react";
import { Container, Row } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import SingleBlog from "./SingleBlog";

const { title, blogs } = blogOne;

const BlogOne = ({
  noTitle = false,
  className = "",
  totalBlogs,
  children,
  isScrollActive = false,
}) => {
  const ref = useActive("#blog", isScrollActive);

  return (
    <section ref={ref} className={`blog-one ${className}`} id="blog">
      <Container>
        {!noTitle && (
          <div className="block-title text-center">
            <h2 className="block-title__title black-text-color">
              <TextSplit text={title} />
            </h2>
          </div>
        )}
        <Row className="high-gutters">
          {blogs.slice(0, totalBlogs).map((blog) => (
            <SingleBlog key={blog.id} blog={blog} />
          ))}
        </Row>
        {children}
      </Container>
    </section>
  );
};

export default BlogOne;
