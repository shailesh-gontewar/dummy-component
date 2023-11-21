import React, { useState, useEffect, useRef, useContext } from "react"
import { Link } from "react-router-dom"
import {
  Card,
  Col,
  NavItem,
  NavLink,
  Form,
  Input,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Row,
  TabContent,
  TabPane,
  Button,
  CardBody,
  UncontrolledTooltip,
  FormFeedback,
} from "reactstrap"
import PerfectScrollbar from "react-perfect-scrollbar"
import Pagination from "react-js-pagination"
import { PostApi } from "apis/PostApi"
import axios from "axios"
import Swal from "sweetalert2"
//import images
import { post } from "helpers/api_helper"
import { countBy } from "lodash"
import { useFormik } from "formik"
import * as Yup from "yup"
import config from "config/config"
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en.json"
import ru from "javascript-time-ago/locale/ru.json"
import ReactTimeAgo from "react-time-ago"
import moment from "moment"
import Loading from "components/Loading"
import { SessionContext } from "context/sessionContext"

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)
const PostList = () => {
  const {Session} =useContext(SessionContext)
  let session= Session || sessionStorage.getItem("SessionId");
  const [CurrentPage, setCurrentPage] = useState(1)
  const [Page, setPage] = useState(1)
  const resultPerPage = 10

  const [btnsecondary, setBtnsecondary] = useState(false)
  const [btnsecondary1, setBtnsecondary1] = useState(false)
  // const inputRef = useRef()
  const name = JSON.parse(localStorage.getItem("User"))
  const [activeTab, toggleTab] = useState("1")
  const [postData, setPostData] = useState([])
  const [count, setCount] = useState(0)
  const [count1, setCount1] = useState(0)
  const [liked, setLiked] = useState(false)
  const [comment, setComment] = useState(false)
  const [post_id, setPostId] = useState()
  const [postIdValue, setPostIdValue] = useState()
  const [uncount, setUnCount] = useState(false)
  const [postIdCount, setpostIdCount] = useState()
  const [comments, setComments] = useState([])
  const [commentHideShow, setCommentHideShow] = useState()
  const [commentId, setCommentId] = useState(false)
  const [loader, setLoader] = useState()
  const [thumbCount, setThumbCount] = useState()
  const [angryCount, setAngryCount] = useState()
  const [smileCount, setSmileCount] = useState()
  const [joyCount, setJoyCount] = useState()
  const [commentList, setCommentList] = useState(2)
  const [truncate, settruncate] = useState(true)

  const teacherCode = {
    user_type: name == "Admin" ? "Admin" : "Teacher",
    teacher_code: name?.payload?.t_code ? name?.payload?.t_code : "",
    class: "",
    section: "A",
    resultPerPage: CurrentPage,
    session_id:session,
  }

  useEffect(() => {
    if (postData?.length === 0) {
      setLoader(<Loading />)
    }
    getPostList(teacherCode)
  }, [CurrentPage, commentId,session])

  const getPostList = data => {
    PostApi.GetPost(data)
      .then(res => {
        if (res.data.status === 200) {
          setLoader("")
        }
        setPostData(res.data.post)
        setPage(res.data.post_count)
        // setComments(res.data.post)
      })
      .catch(err => {
        console.log(err)
      })
  }
  const likeDislike = (id, emoji) => {
    setpostIdCount(id)
    let likeData = {
      like_by: name == "Admin" ? "Admin" : "Teacher",
      post_id: id,
      t_code: name?.payload?.t_code,
      emoji_type: emoji,
    }

    PostApi.likeUnlike(likeData)
      .then(res => {
        if (res.data.post_id === likeData.post_id) {
          setAngryCount(res.data.angry_likecount)
          setThumbCount(res.data.thumb_likecount)
          setSmileCount(res.data.smile_likecount)
          setJoyCount(res.data.joy_likecount)
          getPostList(teacherCode)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  // commentCount
  const CommentCount = id => {}

  const handleCommentChange = event => {
    setComment(event.target.value)
  }

  const onPostId = postId => {
    setPostIdValue(postId)
  }
  const getCommentId = commentIdValue => {
    setCommentId(commentIdValue)
  }

  const onDelete = id => {
    const postId = { post_id: id }

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
            getPostList(teacherCode)
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  }

  const thumbColor = liked ? "green" : "red"

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
  // console.log(comments,'postDatammmmm')
  const validationType = useFormik({
    enableReinitialize: true,

    initialValues: {
      fk_post: postIdValue ? Number(postIdValue) : "",
      student_code: "",
      comment: comment ? comment : "",
      comment_by: name == "Admin" ? name : "Teacher",
      st_name: name?.payload?.t_name ? name?.payload?.t_name : "Admin",
      profile_image: name?.payload?.profile_pic_url
        ? name?.payload?.profile_pic_url
        : "",
    },

    validationSchema: Yup.object().shape({
      comment: Yup.string().required("This is required"),
    }),
    onSubmit: values => {
      PostApi.comment(values)
        .then(res => {
          if (res.data.status === 200) {
            setComment("")
            getPostList(teacherCode)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  })
  const commentLikeUnlike = id => {
    let commentLikeUnlikeData = {
      comment_id: id,
      student_code: "",
      teacher_code: name?.payload?.t_code,
      like_by: name == "Admin" ? "Admin" : "Teacher",
      emoji_type: "Thumb",
    }

    PostApi.commentLikeUnlike(commentLikeUnlikeData)
      .then(res => {
        if (res.data.status === 200) {
          getPostList(teacherCode)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteComment = id => {
    let commentId = { comment_id: id }
    PostApi.deleteComment(commentId)
      .then(res => {
        if (res.data.status === 200) {
          // setCurrentPage(res.data.post_count)
          setComment("")
          getPostList(teacherCode)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const StudentBlockUnBlock = (id, student_code) => {
    let dataPost = {
      post_id: id,
      student_code: student_code,
    }
    PostApi.StudentBlockUnBlock(dataPost)
      .then(res => {
        if (res.data.status === 200) {
          getPostList(teacherCode)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <React.Fragment>
      <Col xl={10} lg={12} className="mx-auto">
        <Row>
          <Col>
            <Card className="bg-transparent shadow-none pt-2">
              <CardBody className="p-0 text-end">
                {name == "Admin" ? (
                  ""
                ) : (
                  <Link to="/add-post">
                    <Button
                      color="primary"
                      className="btn btn-primary waves-effect waves-light"
                    >
                      <i className="bx bxs-add-to-queue p-1"></i>
                      Create post
                    </Button>
                  </Link>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <TabContent className="" activeTab={activeTab}>
          {loader ? <div>{loader}</div> : null}
          <Row className="">
            {postData &&
              postData.map((item, index) => (
                <Col key={item.id} sm={6} className="mb-4">
                  <PerfectScrollbar
                    style={{
                      height: "450px",
                      width: "500px",
                    }}
                  >
                    <Card className="p-3">
                      <Row className="p-2">
                        <Col xs={10}>
                          <h5>{item.title}</h5>
                          <p className="text-muted">
                            {moment(item.created_date).format(
                              "DD-MM-YYYY , hh:mm A"
                            )}
                          </p>
                          <span>
                            <b>Class</b> :{" "}
                            {JSON.parse(item.st_class).map(
                              (item, i) => item.label.toUpperCase() + ", "
                            )}
                          </span>
                          <br></br>
                          <span>
                            <b>Subject</b> : {console.log(item.subject_code)}
                            {JSON.parse(item.subject_code).map(
                              (item, i) => item.label + ", "
                            )}
                          </span>
                        </Col>
                        <Col xs={2}>
                          <div className="float-end">
                            <ul className="nav nav-pills">
                              {name == "Admin" ? (
                                <NavItem>
                                  <Link
                                    to="#"
                                    className="badge  font-size-18 text-danger"
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
                                </NavItem>
                              ) : (
                                <NavItem>
                                  <Link
                                    className="text-success"
                                    to={`/edit-post/${item.id}`}
                                  >
                                    <i
                                      className="mdi mdi-pencil font-size-18"
                                      id="edittooltip"
                                    />
                                    <UncontrolledTooltip
                                      placement="top"
                                      target="edittooltip"
                                    >
                                      Edit
                                    </UncontrolledTooltip>
                                  </Link>{" "}
                                  <Link
                                    to="#"
                                    className="badge  font-size-18 text-danger"
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
                                </NavItem>
                              )}
                            </ul>
                          </div>
                        </Col>
                      </Row>
                      <div className="position-relative">
                        {item.media.split(".").at(-1) === "jpg" && (
                          <img
                            src={`${config.BaseImageUrl}/${item.media}`}
                            alt=""
                            style={{ height: "300px", width: "550px" }}
                            className="img-thumbnail"
                          />
                        )}
                         {item.media.split(".").at(-1) === "ico" && (
                          <img
                            src={`${config.BaseImageUrl}/${item.media}`}
                            alt=""
                            style={{ height: "300px", width: "550px" }}
                            className="img-thumbnail"
                          />
                        )}
                        {item.media.split(".").at(-1) === "jpeg" && (
                          <img
                            src={`${config.BaseImageUrl}/${item.media}`}
                            alt=""
                            style={{ height: "300px", width: "550px" }}
                            className="img-thumbnail"
                          />
                        )}
                        {item.media.split(".").at(-1) === "webp" && (
                          <img
                            src={`${config.BaseImageUrl}/${item.media}`}
                            alt=""
                            style={{ height: "300px", width: "550px" }}
                            className="img-thumbnail"
                          />
                        )}
                        {item.media.split(".").at(-1) === "png" && (
                          <img
                            src={`${config.BaseImageUrl}/${item.media}`}
                            alt=""
                            style={{ height: "300px", width: "550px" }}
                            className="img-thumbnail"
                          />
                        )}
                        {item.media.split(".").at(-1) === "pdf" && (
                          <>
                            <iframe
                              src={`https://docs.google.com/viewer?url=${config.BaseImageUrl}/${item.media} &embedded=true`}
                              frameBorder="0"
                              height="500px"
                              width="100%"
                            ></iframe>
                          </>
                        )}
                      </div>
                      <div className="p-3">
                        <p className={truncate ? "text-truncate" : ""}>
                          {item.description}
                          <h6
                            className="text-primary cursor"
                            onClick={() => settruncate(!truncate)}
                          >
                            {" "}
                            {truncate ? "see more" : "see less"}
                          </h6>
                        </p>
                        <ul className="list-inline">
                          <li className="list-inline-item mr-3">
                            <Link to="#" className="text-muted">
                              <i
                                title="Thumb"
                                className="bx bx-like align-middle text-primary me-1"
                                style={{ fontSize: "22px" }}
                                onClick={() => likeDislike(item.id, "Thumb")}
                              ></i>{" "}
                              {postIdCount === item.id && thumbCount}
                              {postIdCount != item.id && item?.thumb_likecount}
                            </Link>
                          </li>
                          {/* <li className="list-inline-item mr-3">
                            <Link to="#" className="text-muted">
                              <i
                                title="Angry"
                                style={{ fontSize: "22px" }}
                                className="bx bx-angry align-middle text-warning me-1"
                                onClick={() => likeDislike(item.id, "Angry")}
                              >
                                {item.count}
                              </i>{" "}
                              {postIdCount === item.id && angryCount}
                              {postIdCount != item.id && item?.angry_likecount}
                            </Link>
                          </li> */}
                          <li className="list-inline-item mr-3">
                            <Link to="#" className="text-muted">
                              <i
                                title="Joy"
                                style={{ fontSize: "22px" }}
                                className="bx bx-happy-alt align-middle text-warning me-1"
                                onClick={() => likeDislike(item.id, "Joy")}
                              >
                                {item.count}
                              </i>{" "}
                              {postIdCount === item.id && joyCount}
                              {postIdCount != item.id && item?.joy_likecount}
                            </Link>
                          </li>
                          <li className="list-inline-item mr-3">
                            <Link to="#" className="text-muted">
                              <i
                                title="Smile"
                                style={{ fontSize: "22px" }}
                                className="bx bx-laugh align-middle text-warning me-1"
                                onClick={() => likeDislike(item.id, "Smile")}
                              >
                                {item.count}
                              </i>{" "}
                              {postIdCount === item.id && smileCount}
                              {postIdCount != item.id && item?.smile_likecount}
                            </Link>
                          </li>

                          <li className="list-inline-item mr-3">
                            <Link
                              to="#"
                              className="text-muted"
                              onClick={() => {
                                getCommentId(item.id), setCommentList(3)
                              }}
                              onDoubleClick={() => setCommentId(!commentId)}
                            >
                              <i
                                className="bx bx-comment-dots align-middle text-primary  me-1"
                                style={{ fontSize: "22px" }}
                              ></i>{" "}
                              {item.comment_count} Comments
                            </Link>
                          </li>
                        </ul>

                        <div className="mt-4">
                          <div className="mt-5">
                            {commentId && commentId == item.id ? (
                              <h5 className="font-size-15">
                                <i className="bx bx-message-dots text-muted align-middle me-1"></i>
                                Comments :{" "}
                                {/* {commentList + " " + item.post_comment.length} */}
                                {4 < item.post_comment.length ? (
                                  commentList + 1 >=
                                  item.post_comment.length ? (
                                    <Link to="#">
                                      <span
                                        style={{
                                          float: "right",
                                          textDecoration: "underline",
                                        }}
                                        onClick={() => setCommentList(2)}
                                      >
                                        see less...
                                      </span>
                                    </Link>
                                  ) : commentList >= 3 ? (
                                    <Link to="#">
                                      <span
                                        style={{
                                          float: "right",
                                          textDecoration: "underline",
                                        }}
                                        onClick={() =>
                                          setCommentList(
                                            item.post_comment.length
                                          )
                                        }
                                      >
                                        see more...
                                      </span>
                                    </Link>
                                  ) : null
                                ) : (
                                  ""
                                )}
                              </h5>
                            ) : (
                              ""
                            )}
                            <div className={!commentId ? "d-none" : ""}>
                              {item.post_comment &&
                                item.post_comment?.map((data, index) => (
                                  <>
                                    {index <= commentList ? (
                                      <div
                                        key={data.id}
                                        className="d-flex py-3"
                                      >
                                        {commentId &&
                                        commentId == data.fk_post_id ? (
                                          <div className="avatar-xs me-3">
                                            <div className="avatar-title rounded-circle bg-light text-primary">
                                              <i className="bx bxs-user"></i>
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {commentId &&
                                        commentId == data.fk_post_id ? (
                                          <div className=" flex-grow-1">
                                            <div className="d-flex">
                                              <div className="d-flex align-items-center flex-grow-1">
                                                <span className=" mb-0">
                                                  {data.st_name}
                                                </span>{" "}
                                                {/* <small className="text-muted px-2"> */}
                                                <small className="text-muted px-1">
                                                  <ReactTimeAgo
                                                    date={data.comment_date}
                                                    locale="en-US"
                                                  />
                                                </small>
                                              </div>
                                              <div className="d-flex align-items-center gap-4 me-auto">
                                                <div className="">
                                                  <small className="text-muted">
                                                    {/* {data.comment_likecount} */}
                                                    {/* comment */}
                                                  </small>
                                                  {/* <Link
                                                    className=""
                                                    to="#"
                                                    onClick={() => {
                                                      setCount(count + 1)
                                                    }}
                                                  >
                                                    {data.comment_likecount ==
                                                    0 ? (
                                                      <i
                                                        className="bx bxs-like text-secondary font-size-18"
                                                        onClick={() => {
                                                          commentLikeUnlike(
                                                            data.id
                                                          )
                                                        }}
                                                      ></i>
                                                    ) : (
                                                      <i
                                                        className="bx bxs-like text-primary font-size-18"
                                                        onClick={() => {
                                                          commentLikeUnlike(
                                                            data.id
                                                          )
                                                        }}
                                                      ></i>
                                                    )}
                                                  </Link> */}
                                                  {data.st_name !== "Admin" ? (
                                                    <Link
                                                      className=""
                                                      to="#"
                                                      onClick={() => {
                                                        setCount(count + 1)
                                                      }}
                                                    >
                                                      <i
                                                        className="bx bxs-message-alt-x text-dark font-size-18"
                                                        onClick={() =>
                                                          deleteComment(data.id)
                                                        }
                                                      ></i>
                                                      {data?.student_code ? (
                                                        <>
                                                          {data?.is_block ===
                                                          "True" ? (
                                                            <>
                                                              <i
                                                                className="px-1 fas fa-ban text-dark font-size-16"
                                                                onClick={() =>
                                                                  StudentBlockUnBlock(
                                                                    data.fk_post_id,
                                                                    data?.student_code
                                                                  )
                                                                }
                                                              ></i>
                                                              {/* {"Unblock"} */}
                                                            </>
                                                          ) : (
                                                            <>
                                                              <i
                                                                className="px-1 fas fa-unlock text-dark font-size-16"
                                                                onClick={() =>
                                                                  StudentBlockUnBlock(
                                                                    data.fk_post_id,
                                                                    data?.student_code
                                                                  )
                                                                }
                                                              ></i>
                                                              {/* {"Block"} */}
                                                            </>
                                                          )}
                                                        </>
                                                      ) : null}
                                                    </Link>
                                                  ) : (
                                                    name === "Admin" && (
                                                      <Link
                                                        className=""
                                                        to="#"
                                                        onClick={() => {
                                                          setCount(count + 1)
                                                        }}
                                                      >
                                                        <i
                                                          className="bx bxs-message-alt-x text-dark font-size-18"
                                                          onClick={() =>
                                                            deleteComment(
                                                              data.id
                                                            )
                                                          }
                                                        ></i>
                                                      </Link>
                                                    )
                                                  )}
                                                </div>
                                                <div className="">
                                                  <Dropdown
                                                    isOpen={btnsecondary}
                                                    toggle={() =>
                                                      setBtnsecondary(
                                                        !btnsecondary
                                                      )
                                                    }
                                                  ></Dropdown>
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
                                                    <DropdownMenu className="bg-transparent shadow-none pt-1 ">
                                                      <DropdownItem>
                                                        <span className="mdi mdi-comment-check text-secondary font-size-18 px-2"></span>
                                                        <i
                                                          className="mdi mdi-delete text-danger font-size-18"
                                                          id="deletetooltip"
                                                        />
                                                      </DropdownItem>
                                                    </DropdownMenu>
                                                  </Dropdown>
                                                </div>
                                              </div>
                                            </div>
                                            <p className="text-muted pt-2">
                                              {data.comment}
                                            </p>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ))}
                            </div>
                          </div>
                          {name == "Admin" ? (
                            commentId && commentId == item.id ? (
                              <div className="flex-grow-1">
                                <Form
                                  onSubmit={e => {
                                    e.preventDefault()
                                    validationType.handleSubmit()
                                  }}
                                >
                                  <Col lg={11}>
                                    <div className="hstack gap-3">
                                      <Input
                                        className="form-control-auto"
                                        name="comment"
                                        type="text"
                                        onChange={handleCommentChange}
                                        onClick={() => onPostId(item.id)}
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
                            ) : (
                              ""
                            )
                          ) : null}
                        </div>

                        <div>
                          <Link
                            to={`/post-detail/${item.id}`}
                            className="text-primary"
                          >
                            {/* Read more <i className="mdi mdi-arrow-right"></i> */}
                          </Link>
                        </div>
                      </div>
                    </Card>
                  </PerfectScrollbar>
                </Col>
              ))}
          </Row>
        </TabContent>
        <div className="col-12 mt-5">
          <nav style={{ backgroundColor: "transparent", borderRadius: 10 }}>
            { postData?.length === 0 ? " " : (
                <ul className="pagination justify-content-center">
                {Page && (
                  <Pagination
                    activePage={CurrentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={Page}
                    // totalItemsCount={
                    //   filteredProducts && productCount ? productCount : 0
                    // }
                    hideFirstLastPages={true}
                    onChange={e => setCurrentPage(e)}
                    nextPageText="Next"
                    prevPageText="Previous"
                    lastPageText="Last"
                    firstPageText="1st"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="active"
                    activeLinkClass="active"
                    hideDisabled={true}
                  />
                )}
              </ul>

            )}
          
          </nav>
        </div>
      </Col>
    </React.Fragment>
  )
}

export default PostList
