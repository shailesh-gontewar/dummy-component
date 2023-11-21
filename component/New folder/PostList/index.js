import React from "react"
import { Container, Row, Button, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import PostList from "./PostList"
import RightBar from "./RightBar"

const Index = () => {
  //meta title
  document.title = "Post List "
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Post" breadcrumbItem="Post List" />
          <Row>
            <PostList />
            {/* <RightBar /> */}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Index
