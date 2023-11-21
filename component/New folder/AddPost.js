import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { PostApi } from "apis/PostApi"
import Swal from "sweetalert2"
import { classApi } from "apis/ClassListApi"
import "react-image-crop/dist/ReactCrop.css"
import Loading from "components/Loading"
import ImageResize from "./Crop/ImageResize"

const AddPost = () => {
  document.title = "Add Post"
  let session = sessionStorage.getItem("SessionId")
  const [selected, setSelected] = useState([])
  const [subselected, setSubSelected] = useState([])
  const [classarray, setClassarray] = useState([])
  const [classList, setClassList] = useState([])
  const [selectedFiles, setselectedFiles] = useState([])
  const [files1, setFiles1] = useState([])
  const [title, setTitle] = useState("")
  const [descri, setdescri] = useState("")
  const [allowComment, setAllowComment] = useState(true)
  const [loading, setloading] = useState(false)
  const [imageToCrop, setImageToCrop] = useState(undefined)
  const [croppedImage, setCroppedImage] = useState(undefined)
  const [check, SetCheck] = useState(false)

  const [user, setUserLogged] = useState(
    JSON.parse(localStorage.getItem("User"))
  )
  const handleChange = selectedOption => {
    // let selectClass = selectedOption.toLowerCase()
    // setSelected(selectedOption.map(str => str.label))
    setSelected(selectedOption)
  }
  const subhandleChange = selectedOption => {
    // setSubSelected(selectedOption.map(str => str.value))
    setSubSelected(selectedOption)
  }

  const handleTitleChange = event => {
    setTitle(event.target.value)
  }
  const handleDescriChange = event => {
    setdescri(event.target.value)
  }
  useEffect(() => {
    classApi
      .getAllClass()
      .then(res => {
        setClassList(res.data)
        // setClassListOption(user?.teacher_subject?.map(cl => {
        //   return {
        //     value: cl.UID,
        //     label: `${cl.st_class} ${cl.st_sec}`,
        //   }
        // }))
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  let suboption = user?.teacher_subject
    ?.filter(sub =>
      classList?.subject?.some(s => sub.subject_code === s.subject_code)
    )
    .map(sub => {
      let match = classList?.subject?.find(
        s => sub.subject_code === s.subject_code
      )

      return {
        value: match.subject_code,
        label: match.subject_name,
      }
    })

  let subject_list = suboption?.filter((obj, index, arr, t) => {
    return index === arr.findIndex(d => d.value === obj.value)
  })
  // console.log(suboption,'suboption')

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

  const subjectListOption = classList?.subject?.map(sub => {
    return {
      value: sub.subject_code,
      label: sub.subject_name,
    }
  })

  if (check === "Image") {
    fetch(croppedImage)
      .then(response => response.blob())
      .then(blobData => {
        const file = new File([blobData], "image.jpg", { type: "image/jpeg" })
        setFiles1(file)
      })
      .catch(error => {
        console.error("Error fetching Blob data:", error)
      })
  }

  //  form validation
  const validationType = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title,
      description: descri,
      st_class: selected ? selected : "",
      subject_code: subselected ? subselected : "",
      is_allow: allowComment ? "True" : "False",
      teacher_code: user?.payload?.t_code,
      teacher_name: user?.payload?.t_name,
      media: files1,
    },
    validationSchema: Yup.object().shape({
      media: Yup.string().required("This is required"),
      title: Yup.string().required("This is required"),
      description: Yup.string().required("This is required"),
      media: Yup.string().required("This is required"),
      // st_class: Yup.string().required("This is required"),
      st_class: Yup.array().min(1, "This is required"),
      subject_code: Yup.array().min(1, "This is required"),
      // is_allow: Yup.string().required("This is required"),
      // teacher_code: Yup.string().required("This is required"),
    }),
    onSubmit: values => {
      setloading(true)
      const data = new FormData()
      data.append("title", values.title)
      data.append("description", values.description)
      data.append("st_class", JSON.stringify(selected))
      data.append("subject_code", JSON.stringify(subselected))
      data.append("is_allow", values.is_allow)
      data.append("teacher_code", values.teacher_code)
      data.append("teacher_name", values.teacher_name)
      data.append("media", files1)
      data.append("profile_pic_url", user?.payload?.profile_pic_url)
      data.append("session_id", session)

      PostApi.createPost(data)
        .then(res => {
          console.log(res)
          if (res.data.status === 200) {
            setloading(false)
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

  const onUploadFile = event => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader()

      reader.addEventListener("load", () => {
        const image = reader.result
        setImageToCrop(image)
      })

      reader.readAsDataURL(event.target.files[0])
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Post" breadcrumbItem="Add Post" />
          <Row>
            <Col xs="12">
              <Card>
                {loading ? (
                  <Loading />
                ) : (
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
                              // onChange={validationType.handleChange}
                              onChange={handleDescriChange}
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
                            <Label className="control-label my-control">
                              Class
                            </Label>
                            <Select
                              name="st_class"
                              classNamePrefix="select2-selection"
                              placeholder="Select Class..."
                              title="Class"
                              // options={classListOption}set
                              options={classListOption}
                              isMulti
                              // onClick={alert("tt")}
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
                                {/* {validationType.errors.st_class} */}
                                This is required
                              </div>
                            ) : null}
                          </div>
                        </Col>

                        <Col sm={6}>
                          <div className="mb-3">
                            <Label htmlFor="validationCustom01">Upload</Label>
                            <Input
                              type="radio"
                              className="form-check-Input mx-2"
                              id="formrow-customCheck"
                              checked={check === "Image" ? true : false}
                              onChange={e => SetCheck("Image")}
                            />
                            Image
                            <Input
                              type="radio"
                              className="form-check-Input mx-2"
                              id="formrow-customCheck"
                              checked={check === "PDF" ? true : false}
                              onChange={e => SetCheck("PDF")}
                            />
                            Document
                            {check === "Image" ? (
                              <Input
                                name="media"
                                placeholder="Enter Image Url"
                                type="file"
                                className="form-control"
                                accept="image/*"
                                required
                                // accept="image/png, image/jpeg, application/pdf"
                                onChange={onUploadFile}
                                invalid={
                                  validationType.touched.media &&
                                  validationType.errors.media
                                    ? true
                                    : false
                                }
                              />
                            ) : null}
                            {check === "PDF" ? (
                              <Input
                                name="media"
                                placeholder="Enter Image Url"
                                type="file"
                                className="form-control"
                                accept="application/pdf"
                                required
                                // accept="image/png, image/jpeg, application/pdf"
                                // accept=".pdf,.docx"
                                onChange={e => {
                                  validationType.setFieldValue(
                                    "media",
                                    e.target.files[0]
                                  ),
                                    setFiles1(e.target.files[0])
                                }}
                                invalid={
                                  validationType.touched.media &&
                                  validationType.errors.media
                                    ? true
                                    : false
                                }
                              />
                            ) : null}
                            {validationType.touched.media &&
                            validationType.errors.media ? (
                              <FormFeedback type="invalid">
                                This is required
                              </FormFeedback>
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
                              // options={suboption}
                              options={subject_list}
                              isMulti
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
                                {/* {validationType.errors.subject_code} */}
                                This is required
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
                                id="square-switch1"
                                className="switch"
                                defaultChecked={allowComment}
                                onChange={() => setAllowComment(!allowComment)}
                              />
                              <label
                                htmlFor="square-switch1"
                                data-on-label="On"
                                data-off-label="Off"
                              />
                            </div>
                          </div>
                        </Col>
                        {/* <Col sm="6">
                        <Card>
                          <CardBody>
                            <CardTitle className="mb-3">
                              Upload Images or PDF
                            </CardTitle>

                            <Dropzone
                              onDrop={acceptedFiles => {
                                handleAcceptedFiles(acceptedFiles)
                              }}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div className="dropzone">
                                  <div
                                    className="dz-message needsclick"
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    <div className="dz-message needsclick">
                                      <div className="mb-3">
                                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                                      </div>
                                      <h4>
                                        Drop files here or click to upload.
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
                            <div
                              className="dropzone-previews mt-3"
                              id="file-previews"
                            >
                              {selectedFiles.map((f, i) => {
                                return (
                                  <Card
                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                    key={i + "-file"}
                                  >
                                    <div className="p-2">
                                      <Row className="align-items-center">
                                        <Col className="col-auto">
                                          <img
                                            data-dz-thumbnail=""
                                            height="80"
                                            className="avatar-sm rounded bg-light"
                                            alt={f.name}
                                            src={f.preview}
                                          />
                                        </Col>
                                        <Col>
                                          <Link
                                            to="#"
                                            className="text-muted font-weight-bold"
                                          >
                                            {f.name}
                                          </Link>
                                          <p className="mb-0">
                                            <strong>{f.formattedSize}</strong>
                                          </p>
                                        </Col>
                                      </Row>
                                    </div>
                                  </Card>
                                )
                              })}
                            </div>
                          </CardBody>
                        </Card>
                      </Col> */}
                      </Row>
                      <div className="d-flex flex-wrap gap-2">
                        <Button type="submit" color="primary" className="btn ">
                          SUBMIT
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                )}
              </Card>
            </Col>
            <Col sm="12">
              <Row>
                <Col>
                  <ImageResize
                    imageToCrop={imageToCrop}
                    onImageCropped={croppedImage =>
                      setCroppedImage(croppedImage)
                    }
                  />
                </Col>
                <Col>
                  {croppedImage && <img alt="Cropped Img" src={croppedImage} />}
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default AddPost
