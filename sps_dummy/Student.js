import React, { useState } from "react"
import { Link } from "react-router-dom"
import Knob from "../AllCharts/knob/knob"
import { Table, Row, Col, Card, CardBody, CardTitle } from "reactstrap"
const Student = props => {
  const [activeTab, setActiveTab] = useState("1")
  const [readonly, setreadonly] = useState(85)
  const [absent, setabsent] = useState(14)
  const [present, setpresent] = useState(65)

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  return (
    <React.Fragment>
      <Col xl={12}>
        <Row>
          <Col md={11} className="m-auto">
            <form className="app-search bg-light p-0 d-lg-block ">
              <div className="position-relative">
                <input
                  // onChange={e => {
                  //   setValue(e.target.value)
                  //   onChange(e.target.value)
                  // }}
                  id="search-bar-0"
                  type="text"
                  className="form-control"
                  placeholder="Search Student..."
                  // value={value || ""}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>
          </Col>
        </Row>

        <Row className="">
          <Col xl={12}>
            <Card className="shadow-none">
              <CardBody>
                <CardTitle className="h4"></CardTitle>
                <div className="table-responsive text-center">
                  <Table className="table table-borderless mb-0">
                    <thead>
                      <tr>
                        <th>
                          <h5 className="text-muted mb-1">Sr</h5>
                        </th>
                        <th>
                          <h5 className="text-muted mb-1">Roll Number</h5>
                        </th>
                        <th>
                          <h5 className="text-muted mb-1">Name</h5>
                        </th>
                        <th>
                          <h5 className="text-muted mb-1">Attendance</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>01</td>
                        <td>Anuradha Singh</td>
                        <td>
                          <div className="mx-2">
                            <Link
                              to="#"
                              className="text-success mx-2"
                              // onClick={() => {
                              //   const userData = cellProps.row.original;
                              //   handleUserClick(userData);
                              // }}
                            >
                              <span
                                className="mdi mdi-check mdi-24px "
                                id="edittooltip"
                              ></span>
                            </Link>
                            <Link
                              to="#"
                              className="text-danger mx-2"
                              // onClick={() => {
                              //   const userData = cellProps.row.original;
                              //   onClickDelete(userData);
                              // }}
                            >
                              <span
                                className="mdi mdi-window-close mdi-24px"
                                id="deletetooltip"
                              ></span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Row className="">
                  <Col sm={6}>
                    <div className="text-center" dir="ltr">
                      <Knob
                        value={readonly}
                        fgColor="#556ee6"
                        thickness={0.15}
                        readOnly={true}
                        height={100}
                        width={100}
                        onChange={e => {
                          setreadonly(e)
                        }}
                      />
                      <h5 className="font-size-14 mt-3">Session Average</h5>
                    </div>
                  </Col>
                  <Col sm={6} >
                    <div className="text-center" dir="ltr">
                      <Knob
                        value={present}
                        fgColor="#34c38f"
                        thickness={0.15}
                        readOnly={true}
                        height={100}
                        width={100}
                        onChange={e => {
                          setpresent(e)
                        }}
                      />
                      <h5 className="font-size-14 mt-3">Monthly Average</h5>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  )
}

export default Student
