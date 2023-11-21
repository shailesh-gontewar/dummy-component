import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
// import { useNavigate } from "react-router-dom";
const subcategory = [
  { label: "Math" },
  { label: "Science" },
  { label: "Geography" },
  { label: "History" },
  { label: "English" },
];
// const category = [
//   { label: "I" },
//   { label: "III" },
//   { label: "IV" },
//   { label: "VI" },
//   { label: "VII" },
// ];
const category=["I","VII"]
const CreatePost = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  // const navigate = useNavigate();
  const handleFormSubmit = (values) => {
    console.log(values);
    // navigate("/post");
  };

  return (
    <Box
      borderRadius="0px"
      component="main"
      sx={{
        p: 3,
        pt: 5,
        maxWidth: 500,
        boxShadow: "1px 1px 8px #90caf9",
      }}
      m="auto"
    >
      <Header title="Add New Post" subtitle="" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                size="small"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <Autocomplete
                size="small"
                variant="outlined"
                disablePortal
                id="combo-box-demo"
                options={subcategory}
                sx={{ gridColumn: "span 4" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Category"
                    variant="outlined"
                    type="text"
                  />
                )}
              />
              <Autocomplete
                size="small"
                variant="outlined"
                
                id="combo-box-demo"
                options={category}
                sx={{ gridColumn: "span 4" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Class"
                    variant="outlined"
                    type="text"
                    onChange={handleChange}
                    value={values.class}
                    error={!!touched.class && !!errors.class}
                    helperText={touched.class && errors.class}
                    name="class"
                  />
                )}
              />
              <Stack alignItems="center" spacing={2}>
                <Button variant="contained" component="label" color="primary">
                  Select
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Stack>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="primary" variant="contained">
                Add Post
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  // class: yup.string().required("required"),
  class: yup
    .string()
    .oneOf(category, "The profession you chose does not exist"),
});
const initialValues = {
  title: "",
  description: "",
  class: "",
  subject: "",
  image: "",
};

export default CreatePost;
