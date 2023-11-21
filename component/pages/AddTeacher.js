import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../component/Header";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { useLocation } from "react-router-dom";
// import Stack from "@mui/material/Stack";

const classList = [
  { label: "I" },
  { label: "II" },
  { label: "III" },
  { label: "IV" },
  { label: "V" },
];
const AddTeacher = () => {
  // const location = useLocation();
  // console.log(location);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const handleFormSubmit = (values) => {
    console.log(values);
    navigate("/addteacher");
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
      <Header title="Add New Teacher" subtitle="" />
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
              gap="2rem"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4"},
              }}
            >
              <TextField
                size="small"
                variant="outlined"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                type="date"
                label=""
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dob}
                name="dob"
                error={!!touched.dob && !!errors.dob}
                helperText={touched.dob && errors.dob}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
              size="small"
              fullWidth
              variant="outlined"
                id="select-class"
                select
                name="class"
                sx={{ gridColumn: "span 4" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.class}
                error={!!touched.class && !!errors.class}
                helperText={touched.class && errors.class}
                SelectProps={{
                  native: true,
                }}
                // helperText="Please select your class"
              >
                 <option value="">Select class</option>
                {classList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              {/* 
              <Field
                label="Select Class"
                name="category"
                as="select"
                onChange={handleChange}
                value={values.category}
                sx={{ gridColumn: "span 4" }}
              >
                <option value="">Select class</option>
                {category.map((d) => (
                  <option value={d.label} key={d.label}>
                    {d.label}
                  </option>
                ))}
              </Field> */}
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                type="password"
                label="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="3.5rem">
              <Button type="submit" color="primary" variant="contained">
                <AddCircleIcon sx={{mr:1}} />
                Add
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  dob: yup.string().required("required"),
  class: yup.string().required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  dob: "",
  class: "",
  password: "",
};

export default AddTeacher;
