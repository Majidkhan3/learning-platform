import blogDetailsPage from "@/data/blogDetailsPage";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import BlogDetailsAuthor from "./BlogDetailsAuthor";
import BlogDetailsContent from "./BlogDetailsContent";
import BlogDetailsSidebar from "./BlogDetailsSidebar";
import CommentForm from "./CommentForm";
import CommentOne from "./CommentOne";
import ShareBlock from "./ShareBlock";

const { blog, tags, share, posts, categories } = blogDetailsPage;
const { author, comments } = blog;

const BlogDetailsPage = () => {
  return (
    <section className="blog-details">
      <Container>
        <Row>
          <Col lg={8}>
            <BlogDetailsContent blog={blog} />
            <ShareBlock tags={tags.slice(0, 3)} share={share} />
            <BlogDetailsAuthor author={author} />
            <CommentOne comments={comments} />
            <CommentForm />
          </Col>
          <Col lg={4}>
            <BlogDetailsSidebar
              posts={posts}
              categories={categories}
              tags={tags}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default BlogDetailsPage;
