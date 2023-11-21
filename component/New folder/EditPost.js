import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap"
import Select from "react-select"
import Dropzone from "react-dropzone"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { PostApi } from "apis/PostApi"
import { error } from "toastr"
import Swal from "sweetalert2"
import { classApi } from "apis/ClassListApi"
import config from "config/config"
import pdf from "../../assets/images/users/PDF_file_icon.svg.png"

const EditPost = () => {
  //meta title
  document.title = "Edit Post"
  let session=sessionStorage.getItem("SessionId");
  const [user, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("User"))
  )
  // const [selected, setSelected] = useState([{"value":1, "label":"ma A"},{"value":4, "label":"mb B"},{"value":4, "label":"mb B"},{"value":6, "label":"pre1 B"}])
  const [selected, setSelected] = useState([])
  
  const [classSelected, setClassSelected] = useState()
  // const [classSelected, setClassSelected] = useState([{"value":1, "label":"ENGLISH ELE"},{"value":4, "label":"ASAMESE"}])
  // const [selected, setSelected] = useState()
  const [subselected, setSubSelected] = useState()
  const [classList, setClassList] = useState([])
  const [selectedFiles, setselectedFiles] = useState([])
  const [files1, setFiles1] = useState([])
  const [allowComment, setAllowComment] = useState(false)
  const [filterClass, setFilterClass] = useState()
  const { post_id } = useParams()
  const [title, setTitle] = useState("")
  const [titleEmpty, setTitleEmpty] = useState("")
  const [description, setDescription] = useState("")
  const [selectedOptions, setSelectedOptions] = useState()
  const [selectedOptions1, setSelectedOptions1] = useState();
  // const [selectedOptions, setSelectedOptions] = useState([{"value":"041","label":"ARITHMETIC"},{"value":"411","label":"BANKING & INSURANCE"}]);

  // console.log(post_id)
  const [postData, setPostData] = useState([])
  // console.log(postData)
  useEffect(() => {
    
    let teacherCode = {
      user_type: user == "Admin" ? "Admin" : "Teacher",
      teacher_code: user?.payload?.t_code ? user?.payload?.t_code : "",
      class: "",
      section: "A",
      resultPerPage: 1,
      session_id:session,
    }
    
    // var str = 'Hello, World, etc';

    PostApi.GetPost(teacherCode)
      .then(res => {
        let uniquePost = res.data.post.find(post => post.id === Number(post_id))

        const str_array = uniquePost.st_class.split(",")

        for (var i = 0; i < str_array.length; i++) {
          str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "")
        }
        setFilterClass(str_array)

        setPostData(uniquePost)
        setTitle(uniquePost.title)
        setDescription(uniquePost.description)
        setAllowComment(uniquePost.is_allow)
        setSelected(JSON.parse(uniquePost.st_class))
        setSubSelected(JSON.parse(uniquePost.subject_code))        
      })
      .catch(err => {
        console.log(err)
      })
    classApi
      .getAllClass()
      .then(res => {
        setClassList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    classListOptiontest3()
  }, [])
// console.log(selectedOptions1,'selectedOptions1')
  const handleChange = selectedOption => {
    // let data = selectedOption.map(str => str.label)
    // setSelected(data)
    setSelected(selectedOption)
    // setSelectedOptions(selectedOption);
  }
  // console.log(selected,'selected')
  const subhandleChange = selectedOption => {
    setSubSelected(selectedOption)
  }
  const commentChange = () => {
    if (allowComment === true) {
      setAllowComment(false)
    } else {
      setAllowComment(true)
    }
    // setAllowComment(!allowComment)
  }
  
  const handleTitleChange = event => {
    setTitle(event.target.value)
  }
  const handleDescriChange = event => {
    setDescription(event.target.value)
  }

  // const classListOption = classList?.section_list?.map(cl => {
  //   return {
  //     value: cl.UID,
  //     label: `${cl.st_class} ${cl.st_sec}`,
  //   }
  // })

  const classListOption = user?.teacher_subject?.map(cl => {    
    return {
      value: cl.uid,
      label: `${cl.st_class} ${cl.st_sec}`,
    }
  })

  let suboption =  user?.teacher_subject?.filter((sub) => classList?.subject?.some((s) => sub.subject_code === s.subject_code))
  .map((sub) => {
    let match = classList?.subject?.find((s) => sub.subject_code === s.subject_code);

    return {
      value: match.subject_code,
      label: match.subject_name,
    };
  });

  const classListOptiontest = classList?.section_list
    ?.filter(cl => cl.UID == 1)
    .map(cl => {
      return {
        value: cl.UID,
        label: `${cl.st_class} ${cl.st_sec}`,
      }
    })
    
  const classListOptiontest3 = () => {
    var classListOption1 = []
    classList?.section_list?.map(item => {
      let classString = `${item.st_class} ${item.st_sec}`
     
      for (var i = 0; i != filterClass.length; i++) {
        if (classString == filterClass[i]) {
          
          var classListOption1 = []
          var classListOption12 = []
          classListOption12 = {
            // return {
            value: item.UID,
            label: `${item.st_class} ${item.st_sec}`,
            // }
          }
          classListOption1.push(classListOption12)
          
          // let {studentClassList} = classListOption1
          const obj1 = Object.assign({}, classListOption1)

          // Object?.keys(classListOption1).map( (item) =>{
          //   console.log(item,'classListOption1')
          // })
          // console.log(obj1,'classListOption1')
          // setSelectedOptions(classListOption1)
        }
      }
    })
    // console.log(classListOptiontest3(),'classListOption1');

    const subjectListOption = classList?.subject?.map(sub => {
      return {
        value: sub.subject_code,
        label: sub.subject_name,
      }
    })
  }
  var classListOption1 = []
  classList?.section_list?.map(item => {
   
    let classString = `${item.st_class} ${item.st_sec}`
    // function containsAny(classString, filterClass) {
    // for (var i = 0; i != filterClass.length; i++) {

    //  if(classString == filterClass[i])
    //  {
    //   var classListOption1 = []
    //   var classListOption12 = []
    //     classListOption12 =  {
        // return {
          // value: item.UID,
          // label: `${item.st_class} ${item.st_sec}`,
        // }
      // }
    // classListOption1.push(classListOption12)
    // const obj1 = Object.assign({}, classListOption1) 

    //  }

    // }
  })
  
  const subjectListOption = classList?.subject?.map(sub => {
    return {
      value: sub.subject_code,
      label: sub.subject_name,
    }
  }) 
  let res_class = postData.st_class 

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }
  //  form validation
  const validationType = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title,
      description: description,
      st_class: selected,
      subject_code: subselected,
      is_allow: allowComment ? "True" : "False",
     
      teacher_code: user?.payload?.t_code,
      teacher_name: user?.payload?.t_name,
      media: "",
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required("This is required"),
      description: Yup.string().required("This is required"),
      // media: Yup.string().required("This is required"),
      st_class: Yup.array().min(1, "This is required"),
      subject_code: Yup.array().min(1, "This is required"),
      is_allow: Yup.string().required("This is required"),
      // teacher_code: Yup.string().required("This is required"),
    }),
    onSubmit: values => {
      // console.log(values)
      // return
      const data = new FormData()
      data.append("title", values.title)
      data.append("description", values.description)
      data.append("media", files1)
      // data.append("st_class", Array.from(values.st_class))
      data.append("st_class", JSON.stringify(selected))
      data.append("subject_code", JSON.stringify(subselected))
      data.append("is_allow", values.is_allow)
      data.append("teacher_code", values.teacher_code)
      data.append("teacher_name", values.teacher_name)
      data.append("post_id", post_id)
      data.append("session_id", session)

      PostApi.updatePost(data)
        .then(res => {
          // console.log(res)
          if (res.data.status === 200) {
            Swal.fire({
              text: res.data.msg,
              icon: "success",
              imageAlt: "success image",
            }).then(result => {
              if (result.isConfirmed) {
                window.location.href = "/post"
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
  })
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Post" breadcrumbItem="Edit Post" />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  <CardTitle>Information</CardTitle>
                  <p className="card-title-desc mb-4">
                    Fill all information below
                  </p>
                  <Form
                    onSubmit={e => {
                      e.preventDefault()
                      validationType.handleSubmit()
                    }}
                  >
                    <Row>
                      <Col sm="6">
                        <div className="mb-3">
                          <Label htmlFor="posttitle" className="my-control">
                            Title
                          </Label>
                          <Input
                            id="posttitle"
                            name="title"
                            type="text"
                            className="form-control"
                            placeholder="Title"
                            onChange={handleTitleChange}
                            // onChange={validationType.handleChange}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.title || ""}
                            invalid={
                              validationType.touched.title &&
                              validationType.errors.title
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.title &&
                          validationType.errors.title ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.title}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="form-label my-control">
                            Description
                          </Label>
                          <Input
                            name="description"
                            rows="5"
                            placeholder="Write here your post description....."
                            type="textarea"
                            onChange={handleDescriChange}
                            // onChange={validationType.handleChange}
                            onBlur={validationType.handleBlur}
                            value={validationType.values.description || ""}
                            invalid={
                              validationType.touched.description &&
                              validationType.errors.description
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.description &&
                          validationType.errors.description ? (
                            <FormFeedback type="invalid">
                              {validationType.errors.description}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="validationCustom01">
                            Upload Images or PDF
                          </Label>
                          <Input
                            name="media"
                            placeholder="Enter Banner Image Url"
                            type="file"
                            className="form-control"
                            onChange={e => {
                              setFiles1(e.target.files[0])
                              validationType.setFieldValue(
                                "media",
                                e.target.files[0]
                              )
                            }}
                            invalid={
                              validationType.touched.media &&
                              validationType.errors.media
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.media &&
                          validationType.errors.media ? (
                            <div
                              style={{
                                color: "#f46a6a",
                                fontSize: "11px",
                                marginTop: "3px",
                              }}
                            >
                              {validationType.errors.media}
                            </div>
                          ) : null}
                        </div>
                        <div className="position-relative my-2">
                          {(postData?.media &&
                            postData?.media?.split(".").at(-1) == "jpg") ||
                          "jpeg" ||
                          "png" ? (
                            <img
                              src={`${config.BaseImageUrl}/${postData?.media}`}
                              alt=""
                              width="200"
                            />
                          ) : (
                            <a
                              href={`${config.BaseImageUrl}/${postData?.media}`}
                              rel="noopener noreferrer"
                              target="_blank"
                              className="text-muted"
                            >
                              <img
                                src={pdf}
                                alt=""
                                width="100"
                              />
                            </a>
                          )}

                          {postData?.media &&
                          postData.media.split(".").at(-1) == "pdf" ? (
                            <iframe
                            src={`https://docs.google.com/viewer?url=${config.BaseImageUrl}/${postData?.media} &embedded=true`}
                            frameBorder="0"
                            height="200px"
                            width="578"
                          ></iframe>
                            // <a
                            //   href={`${config.BaseImageUrl}/${postData?.media}`}
                            //   rel="noopener noreferrer"
                            //   target="_blank"
                            //   className="text-muted"
                            // >
                            //   <img
                            //     src={pdf}
                            //     alt=""
                            //     width="100"
                            //   />
                            // </a>
                          ) : (
                            <></>
                          )}
                          {/* <img src={`http://31.187.75.67:8000/media/${postData?.media}`} alt="" width="200" /> */}
                        </div>
                      </Col>
                      <Col sm={6}>
                        <div className="mb-3">
                          <Label className="control-label my-control">
                            Class
                          </Label>
                          <Select
                            name="st_class"
                            classNamePrefix="select2-selection"
                            placeholder="Select Class..."
                            title="Class"
                            options={classListOption}
                            isMulti
                            // value={selectedOptions}
                            value={selected}
                            // value={classListOption1 ? classListOption1 : ""}
                            
                            onChange={handleChange}
                            onBlur={validationType.handleBlur}
                            invalid={
                              validationType.touched.st_class &&
                              validationType.errors.st_class
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.st_class &&
                          validationType.errors.st_class ? (
                            <div
                              style={{
                                color: "#f46a6a",
                                fontSize: "11px",
                                marginTop: "3px",
                              }}
                            >
                              {validationType.errors.st_class}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label className="control-label my-control">
                            Subject
                          </Label>
                          <Select
                            name="subject_code"
                            classNamePrefix="select2-selection"
                            placeholder="Select Subject..."
                            title="Subject"
                            // options={subjectListOption}
                            options={suboption}
                            isMulti
                            value={subselected}
                            onChange={subhandleChange}
                            onBlur={validationType.handleBlur}
                            invalid={
                              validationType.touched.subject_code &&
                              validationType.errors.subject_code
                                ? true
                                : false
                            }
                          />
                          {validationType.touched.subject_code &&
                          validationType.errors.subject_code ? (
                            <div
                              style={{
                                color: "#f46a6a",
                                fontSize: "11px",
                                marginTop: "3px",
                              }}
                            >
                              {validationType.errors.subject_code}
                            </div>
                          ) : null}
                        </div>
                        <div className="mb-3 d-flex">
                          <Label
                            className="form-check-Label me-2"
                            htmlFor="formrow-customCheck"
                          >
                            Comments
                          </Label>

                          <div className="square-switch">
                            <input
                              type="checkbox"
                              name="is_allow"
                              id="square-switch1"
                              className="switch"
                              defaultChecked={postData && postData?.is_allow}
                              // onChange={() => setAllowComment(!allowComment)}
                              // onChange={commentChange}
                              onClick={(e) => {
                                if (allowComment === true) {
                                  setAllowComment(false)
                                }
                                if (allowComment === false) {
                                  setAllowComment(true)
                                }
                              }}
                            />
                            <label
                              htmlFor="square-switch1"
                              data-on-label="On"
                              data-off-label="Off"
                            />
                          </div>
                        </div>
                      </Col>
                     
                    </Row>
                    <div className="d-flex flex-wrap gap-2">
                      <Button type="submit" color="primary" className="btn ">
                        UPDATE
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EditPost
