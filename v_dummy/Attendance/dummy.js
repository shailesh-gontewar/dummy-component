<>
  <Col lg={4}>
    <Card className="my-cursor" onClick={() => handleTotalClick()}>
      <CardBody className="top_counter">
        <div className="icon">
          <div className="avatar-title bg-transparent rounded-circle text-primary font-size-20">
            <img src={img4} alt="pre" width={59} />
          </div>
        </div>
        <div className="content">
          <h5>Total</h5>
          <h5 class="number mb-0">
            {studentList?.total_student ? studentList?.total_student : "00"}
          </h5>
          {/* <h5 className="text-white mb-2">Total</h5>
              <h3 className="mb-0">{studentList.total_student}00</h3> */}
        </div>

        <div>
          <Modal isOpen={totalmodal} toggle={Ttoggle}>
            <ModalHeader toggle={Ttoggle} tag="h5" close={closeBtn}>
              Total students on {convertDate(attendence_date)}
            </ModalHeader>
            <ModalBody>
              <Card className="shadow-none">
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="text-center">Sr No</th>
                          <th className="text-center">Student Code</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentList?.payload?.map((stu, index) => (
                          <tr key={index}>
                            <th scope="row" className="text-center">
                              {index + 1}
                            </th>
                            <td className="text-center"> {stu.student_code}</td>
                            <td> {stu.student_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
          </Modal>
        </div>
      </CardBody>
    </Card>
  </Col>
  <Col lg={4}>
    <Card
      className="blog-stats-wid my-cursor"
      onClick={() => handlePresentClick()}
    >
      <CardBody className="top_counter">
        <div className="icon">
          <div className="avatar-title bg-transparent  rounded-circle text-primary font-size-20">
            <img src={img1} alt="pre" width={59} />
          </div>
        </div>
        <div className="content">
          <h5 className="text-white">Present</h5>
          <h5 className="mb-0">
            {studentList?.present_student ? studentList?.present_student : "00"}
          </h5>
        </div>

        <div>
          <Modal
            isOpen={presentmodal}
            toggle={Ptoggle}
            // style={{ width: "380px" }}
          >
            <ModalHeader toggle={Ptoggle} tag="h5">
              Present students on {convertDate(attendence_date)}
            </ModalHeader>
            <ModalBody>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn-sm btn btn-success m-2"
                color="success"
                table="table-to-xls"
                filename="attendance"
                sheet="tablexls"
                buttonText="Print"
              />

              <Card className="shadow-none">
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table table-striped" id="table-to-xls">
                      <thead className="d-none">
                        <tr>
                          <th className="text-center">
                            List of Present Student
                          </th>
                          <th className="text-center">
                            {/* {`${st_class.toUpperCase()} ${st_sec}`} */}
                          </th>
                          <th>{studentList?.attendence_date}</th>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th className="text-center">Sr No</th>
                          <th className="text-center">Student Code</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentList?.present_list?.map((stu, index) => (
                          <tr key={index}>
                            <th scope="row" className="text-center">
                              {index + 1}
                            </th>
                            <td className="text-center"> {stu.student_code}</td>
                            <td> {stu.student_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
          </Modal>
        </div>
      </CardBody>
    </Card>
  </Col>
  <Col lg={4}>
    <Card
      className="blog-stats-wid my-cursor"
      onClick={() => handleProjectClick()}
    >
      <CardBody className="top_counter">
        <div className="icon ">
          <div className="avatar-title bg-transparent rounded-circle text-primary font-size-20">
            <img src={img2} alt="pre" width={59} />
          </div>
        </div>
        <div className="content">
          <h5 className="text-white mb-2">Absent</h5>
          <h5 className="mb-0 ">
            {studentList?.absent_student ? studentList?.absent_student : "00"}{" "}
          </h5>
        </div>
        <div>
          <Modal
            isOpen={modal}
            toggle={toggle}
            // style={{ width: "380px" }}
          >
            <ModalHeader toggle={toggle} tag="h5">
              Absent students on {convertDate(attendence_date)}
            </ModalHeader>
            <ModalBody>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn-sm btn btn-success m-2"
                color="success"
                table="table-to-xls"
                filename="attendance"
                sheet="tablexls"
                buttonText="Print"
              />
              <Card className="shadow-none">
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table table-striped" id="table-to-xls">
                      <thead className="d-none">
                        <tr>
                          <th className="text-center">
                            List of Absent Student
                          </th>
                          <th className="text-center">
                            {/* {`${st_class.toUpperCase()} ${st_sec}`} */}
                          </th>
                          <th>{studentList?.attendence_date}</th>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th className="text-center">Sr No</th>
                          <th className="text-center">Student Code</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentList?.absent_list?.map((stu, index) => (
                          <tr key={index}>
                            <th scope="row" className="text-center">
                              {index + 1}
                            </th>
                            <td className="text-center"> {stu.student_code}</td>
                            <td> {stu.student_name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </ModalBody>
          </Modal>
        </div>
      </CardBody>
    </Card>
  </Col>
</>;
