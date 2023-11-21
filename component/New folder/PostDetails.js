import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import {
  Container,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Label,
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledTooltip,
  UncontrolledDropdown,
  Dropdown,
  Button,
  FormFeedback,
} from "reactstrap"
import * as Yup from "yup"
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { PostApi } from "apis/PostApi"
import Swal from "sweetalert2"
import Select from "react-select"

// import images
import img1 from "../../assets/images/small/img-2.jpg"
import avtar1 from "../../assets/images/users/avatar-2.jpg"
import pdf from "../../assets/images/users/PDF_file_icon.svg.png"
import { useFormik } from "formik"
import { clearConfigCache } from "prettier"

const PostDetails = () => {
  const [count, setCount] = useState(10)
  const { post_id } = useParams()
  const [btnsecondary, setBtnsecondary] = useState(false)
  const [btnsecondary1, setBtnsecondary1] = useState(false)
  const [postData, setPostData] = useState([])
  const [allPostData, setAllPostData] = useState([])
  const [selected, setSelected] = useState([])
  const [subselected, setSubSelected] = useState([])
  const [allowComment, setAllowComment] = useState(true)
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState("")
  const [user, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("User"))
  )
  const postId = { post_id: post_id }

  const name = JSON.parse(localStorage.getItem("User"))

  // var date = new Date("2023-04-17T12:16:29.378653");
  //       const YYYY = date.getFullYear();
  //       let DD = date.getMonth()+1;
  //       let MM = date.getDate();
  //       let HH = new Date("2023-04-17T12:16:29.378653").getHours() ;
  //       let mm = date.getMinutes()
  //       let ss = date.getSeconds();
  //       console.log(HH,'sate')
  useEffect(() => {
    let teacherCode = {
      user_type: name == "Admin" ? "Admin" : "Teacher",
      teacher_code: name?.payload?.t_code ? name?.payload?.t_code : "",
      class: "",
      section: "A",
    }
    PostApi.GetPost(teacherCode)
      .then(res => {
        let uniquePost = res.data.post.find(post => post.id === Number(post_id))
        setAllPostData(uniquePost)
        setComments(uniquePost.post_comment)
      })
      .catch(err => {
        console.log(err)
      })
    PostApi.editPost(postId)
      .then(res => {
        setPostData(res.data.post)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  // console.log(comments,'allPostData')
  // Date
  const handleChange = selectedOption => {
    let data = selectedOption.map(str => str.label)
    setSelected(data)
    console.log(data)
  }

  // const subhandleChange = selectedOption => {
  //   setSubSelected(selectedOption.map(str => str.value))
  // }

  const handleCommentChange = event => {
    setComment(event.target.value)
  }

  const deleteComment = id => {
    let commentId = { comment_id: id }
    PostApi.deleteComment(commentId)
      .then(res => {
        if (res.data.status === 200) {
          setComment("")

          let teacherCode = {
            user_type: name == "Admin" ? "Admin" : "Teacher",
            teacher_code: name?.payload?.t_code ? name?.payload?.t_code : "",
            class: "",
            section: "A",
          }
          PostApi.GetPost(teacherCode)
            .then(res => {
              let uniquePost = res.data.post.find(
                post => post.id === Number(post_id)
              )
              setAllPostData(uniquePost)
              setComments(uniquePost.post_comment)
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   validationType.handleSubmit()
  //   setComments([...comments, comment]);
  //   setComment("");
  //   console.log()

  // };
  //  form Validation
  const validationType = useFormik({
    enableReinitialize: true,
    // initialValues: {
    //   title: "",
    //   description:
    //     "",
    //   st_class: selected,
    //   subject_code: subselected,
    //   is_allow: allowComment ? "True" : "False",
    //   teacher_code: user?.payload?.t_code,
    //   teacher_name: user?.payload?.t_name,
    //   media: "",
    // },
    initialValues: {
      fk_post: post_id,
      student_code: "",
      // teacher_code: user?.payload?.t_code ? user?.payload?.t_code : "",
      comment: comment ? comment : "",
      comment_by: name == "Admin" ? name : "Teacher",
      st_name: user?.payload?.t_name ? user?.payload?.t_name : "Admin",
    },

    validationSchema: Yup.object().shape({
      comment: Yup.string().required("This is required"),
      // student_code: Yup.string().required("This is required"),
    }),
    onSubmit: values => {
      PostApi.comment(values)
        .then(res => {
          console.log(res)
          if (res.data.status === 200) {
            setComment("")

            let teacherCode = {
              user_type: name == "Admin" ? "Admin" : "Teacher",
              teacher_code: name?.payload?.t_code ? name?.payload?.t_code : "",
              class: "",
              section: "A",
            }
            PostApi.GetPost(teacherCode)
              .then(res => {
                let uniquePost = res.data.post.find(
                  post => post.id === Number(post_id)
                )
                setAllPostData(uniquePost)
                setComments(uniquePost.post_comment)
              })
              .catch(err => {
                console.log(err)
              })
           
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  })

  // commentListing
  const commentList = id => {
    let paragraph = {
      user_type: "Admin",
      teacher_code: "00020",
      class: "'pre ma",
      section: "A",
    }
  }

  //  Date
  function formatDate(dateString) {
    const dateObj = new Date(dateString)
    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1 // add 1 because getMonth() returns a zero-based index
    const year = dateObj.getFullYear()

    // pad single digit numbers with a leading zero
    const formattedDay = day.toString().padStart(2, "0")
    const formattedMonth = month.toString().padStart(2, "0")

    // return the formatted date string
    return `${formattedDay}-${formattedMonth}-${year}`
  }

  const onDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#f46a6a",
      confirmButtonText: "Yes, delete it!",
    }).then(result => {
      if (result.isConfirmed) {
        PostApi.deletePost(postId)
          .then(res => {
            Swal.fire("Deleted!", res.data.msg, "success")
            window.location.href = "/post"
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }
  //meta title
  document.title = "Post Details"
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Post" breadcrumbItem="Post Details" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="pt-3">
                    <div className="row justify-content-center">
                      {postData.map(item => (
                        <div className="col-xl-8" key={item.id}>
                          <div>
                            <Row>
                              <Col sm={11}>
                                <div className="text-center">
                                  <h4>{item.title}</h4>
                                </div>
                              </Col>
                              <Col sm={1}>
                                <div className="mb-4 text-end">
                                  {name == "Admin" ? (
                                    ""
                                  ) : (
                                    <Link
                                      to="#"
                                      className="badge bg-light font-size-18 text-danger"
                                    >
                                      <i
                                        className="mdi mdi-delete font-size-18"
                                        id="deletetooltip"
                                        onClick={() => onDelete(item.id)}
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="deletetooltip"
                                      >
                                        Delete
                                      </UncontrolledTooltip>
                                    </Link>
                                  )}
                                </div>
                              </Col>
                            </Row>
                            <hr />
                            <div className="text-center">
                              <Row>
                                {/* <Col sm={4}>
                                  <div className="mt-4 mt-sm-0">
                                    <p className="text-muted mb-2">Categories</p>
                                    <h5 className="font-size-15">Environment</h5>
                                  </div>
                                </Col> */}
                                <Col sm={6}>
                                  <div className="mt-4 mt-sm-0">
                                    <p className="text-muted mb-2">Date</p>
                                    <h5 className="font-size-15">
                                      {formatDate(item.created_date)}
                                    </h5>
                                  </div>
                                </Col>
                                <Col sm={6}>
                                  <div className="mt-4 mt-sm-0">
                                    <p className="text-muted mb-2">Post by</p>
                                    <h5 className="font-size-15">
                                      {item.teacher_name}
                                    </h5>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                            <hr />
                            <div className="my-3">
                              {item.media.split(".").at(-1) == "jpg" ||
                              "jpeg" ||
                              "png" ? (
                                <img
                                  src={`http://31.187.75.67:8000/media/${item.media}`}
                                  alt=""
                                  className="img-thumbnail"
                                />
                              ) : (
                                <a
                                  href={`http://31.187.75.67:8000/media/${item.media}`}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="text-muted"
                                >
                                  <img
                                    src={pdf}
                                    alt=""
                                    style={{
                                      height: "176px",
                                      marginLeft: "277px",
                                    }}
                                    className="img-thumbnail text-center"
                                  />
                                </a>
                              )}
                              {item.media.split(".").at(-1) == "pdf" ? (
                                <a
                                  href={`http://31.187.75.67:8000/media/${item.media}`}
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  className="text-muted"
                                >
                                  <img
                                    src={pdf}
                                    alt=""
                                    style={{
                                      height: "176px",
                                      marginLeft: "277px",
                                    }}
                                    className="img-thumbnail "
                                  />
                                </a>
                              ) : (
                                <></>
                              )}
                            </div>
                            <hr />
                            <div className="mt-4">
                              <div className="text-muted font-size-14">
                                <p>{item.description}</p>
                              </div>
                              <hr />
                              <div className="mt-5">
                                <h5 className="font-size-15">
                                  <i className="bx bx-message-dots text-muted align-middle me-1"></i>
                                  Comments :
                                </h5>
                                <div>
                                  {comments &&
                                    comments?.map(item => (
                                      <div
                                        key={item.id}
                                        className="d-flex py-3"
                                      >
                                        <div className="avatar-xs me-3">
                                          <div className="avatar-title rounded-circle bg-light text-primary">
                                            <i className="bx bxs-user"></i>
                                          </div>
                                        </div>

                                        <div className=" flex-grow-1">
                                          <div className="d-flex">
                                            <div className="d-flex align-items-center flex-grow-1">
                                              <h5 className="font-size-16 mb-0">
                                                {item.st_name}
                                              </h5>
                                              <small className="text-muted px-2">
                                                {new Date(
                                                  item.comment_date
                                                ).getHours()}{" "}
                                                hr Ago
                                              </small>
                                            </div>
                                            <div className="d-flex align-items-center gap-4 me-auto">
                                              <div className="">
                                                <small className="text-muted">
                                                  {item.comment_likecount}
                                                </small>
                                                <Link
                                                  className=""
                                                  to="#"
                                                  onClick={() => {
                                                    setCount(count + 1)
                                                  }}
                                                >
                                                  <i className="bx bxs-like text-primary px-1 font-size-18"></i>
                                                </Link>
                                              </div>
                                              <div className="">
                                                <Dropdown
                                                  isOpen={btnsecondary}
                                                  toggle={() =>
                                                    setBtnsecondary(
                                                      !btnsecondary
                                                    )
                                                  }
                                                >
                                                  <DropdownToggle
                                                    tag="button"
                                                    className="btn btn-light text-secondary btn-sm bg-transparent border-0"
                                                  >
                                                    <i className="bx bxs-comment-detail font-size-18"></i>
                                                  </DropdownToggle>
                                                  <DropdownMenu className="bg-transparent shadow-none pt-2">
                                                    {/* <div className="bg-transparent shadow-none">  </div> */}
                                                    <DropdownItem>
                                                      <i className="bx bxs-like text-primary px-1 font-size-18 "></i>
                                                      <i
                                                        className="bx bxs-smile font-size-18 px-1 "
                                                        style={{
                                                          color: "#FDD835",
                                                        }}
                                                      ></i>
                                                      <i className="bx bxs-heart text-danger font-size-18  px-1"></i>
                                                    </DropdownItem>
                                                    {/* <DropdownItem>
                                                  <i className="bx bxs-heart text-danger font-size-18 "></i>
                                                </DropdownItem> */}
                                                  </DropdownMenu>
                                                </Dropdown>
                                              </div>
                                              <div className="">
                                                <Dropdown
                                                  isOpen={btnsecondary1}
                                                  toggle={() =>
                                                    setBtnsecondary1(
                                                      !btnsecondary1
                                                    )
                                                  }
                                                >
                                                  <DropdownToggle
                                                    tag="button"
                                                    className="btn btn-light text-secondary btn-sm bg-transparent border-0"
                                                  >
                                                    <i className="bx bxs-message-alt-x font-size-18" />
                                                  </DropdownToggle>
                                                  {/* <div style={{"margin-bottom": "7px"}}>
                                                  <span className="mdi mdi-comment-check text-secondary font-size-18 px-3 "></span>
                                                  <i
                                                    className="mdi mdi-delete text-danger font-size-20 px-2"
                                                    onClick={() =>
                                                      deleteComment(item.id)
                                                    }
                                                  />
                                                  </div> */}
                                                  {/* <span className="mdi mdi-comment-check text-secondary font-size-18 px-3 "></span>
                                                  <i
                                                    className="mdi mdi-delete text-danger font-size-20 px-3"
                                                    onClick={() =>
                                                      deleteComment(item.id)
                                                    }
                                                  /> */}

                                                  <DropdownMenu className="bg-transparent shadow-none pt-1 ">
                                                    <DropdownItem>
                                                      <span className="mdi mdi-comment-check text-secondary font-size-18 px-2"></span>
                                                      <i
                                                        className="mdi mdi-delete text-danger font-size-18"
                                                        id="deletetooltip"
                                                        onClick={() =>
                                                          deleteComment(item.id)
                                                        }
                                                      />
                                                    </DropdownItem>
                                                  </DropdownMenu>
                                                </Dropdown>
                                              </div>
                                            </div>
                                          </div>
                                          <p className="text-muted pt-2">
                                            {item.comment}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                </div>
                              </div>
                              {/* {name == "Admin" ? ( */}
                              <div className="flex-grow-1">
                                <Form
                                  onSubmit={e => {
                                    e.preventDefault()
                                    validationType.handleSubmit()
                                  }}
                                >
                                  <Col lg={11}>
                                    <div className="hstack gap-3">
                                      {/* <Input
                                          id="posttitle"
                                          name="comment"
                                          type="text"
                                          className="form-control"
                                          placeholder="Comment"
                                          // onChange={handleTitleChange}
                                          onChange={validationType.handleChange}
                                          onBlur={validationType.handleBlur}
                                          value={validationType.values.comment || ""}
                                          invalid={
                                            validationType.touched.comment &&
                                              validationType.errors.comment
                                              ? true
                                              : false
                                          }
                                        />
                                        {validationType.touched.comment &&
                                          validationType.errors.comment ? (
                                          <FormFeedback type="invalid">
                                            {validationType.errors.comment}
                                          </FormFeedback>
                                        ) : null} */}
                                      <Input
                                        className="form-control-auto"
                                        name="comment"
                                        type="text"
                                        onChange={handleCommentChange}
                                        // onBlur={validationType.handleBlur}
                                        value={
                                          validationType.values.comment || ""
                                        }
                                        invalid={
                                          validationType.touched.comment &&
                                          validationType.errors.comment
                                            ? true
                                            : false
                                        }
                                      />
                                      {validationType.touched.comment &&
                                      validationType.errors.comment ? (
                                        <FormFeedback type="invalid">
                                          {validationType.errors.comment}
                                        </FormFeedback>
                                      ) : null}

                                      <Button
                                        type="submit"
                                        color="primary"
                                        className="btn"
                                      >
                                        Add
                                      </Button>
                                    </div>
                                  </Col>
                                </Form>
                              </div>
                              {/* ) : (
                                " "
                              )} */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PostDetails
