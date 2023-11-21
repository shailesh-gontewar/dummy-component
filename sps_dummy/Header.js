import React from "react"
import { Link } from "react-router-dom"

import {
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap"

const Header = props => {
  const {studentList}=props;
  // console.log(studentList.total_student)
  return (
    <React.Fragment>
      <Row>
        {/* {
          studentList?.map((stu)=>())
        } */}
        <Col lg={4}>
          <Card className="mini-stats-wid">
            <CardBody>
              <div className="d-flex flex-wrap justify-content-center align-items-center ">
                <div className="me-3">
                  <h5 className="text-muted mb-2">Total</h5>
                  <h4 className="mb-0">{studentList.total_student}</h4>
                </div>

                <div className="avatar-sm ms-auto">
                  <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                    <i className="bx bxs-book-bookmark"></i>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="blog-stats-wid">
            <CardBody>
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                <div className="me-3 ">
                  <h5 className="text-muted mb-2">Present</h5>
                  <h4 className="mb-0 ">{studentList.present}</h4>
                </div>
                <div className="avatar-sm ms-auto">
                  <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                    <i className="bx bxs-book-bookmark"></i>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="blog-stats-wid">
            <CardBody>
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                <div className="me-3">
                  <h5 className="text-muted mb-2">Absent</h5>
                  <h4 className="mb-0 ">{studentList.absent}</h4>
                </div>
                <div className="avatar-sm ms-auto">
                  <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                    <i className="bx bxs-book-bookmark"></i>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Header
