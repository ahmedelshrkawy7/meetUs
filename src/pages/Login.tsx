import { useState } from "react";
import { Formik, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input"; // Adjust the import path as per your project structure
import { Mail, Lock, Eye, EyeOff } from "lucide-react"; // Icon library
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { getToken } from "@/utils/auth";

interface Values {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { toast } = useToast();

  // Validation Schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Initial Form Values
  const initialValues = {
    email: "",
    password: "",
  };

  // Handles form submission
  const handleFormSubmission = async (values: Values) => {
    try {
      const response = await axios.post(
        "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
        {
          email: values.email,
          password: values.password,
          isEmployee: true,
        }
      );
      Cookies.set("accessToken", JSON.stringify(response.data));
      navigate("/");
      toast({
        variant: "default", // Using default variant
        title: "Success! You're logged in.",
        description: "Welcome back! You have successfully logged in.",
        action: <ToastAction altText="Close">Close</ToastAction>, // Optional action like closing the toast
        style: { backgroundColor: "green", color: "white" }, // Custom style for success appearance
      });
    } catch (error) {
      console.error(error);
    }
  };
  if (getToken()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="flex justify-between items-center bg-[url('/logo.png')] bg-right bg-cover bg-no-repeat">
      <div className="min-h-screen flex items-center justify-center bg-gradient-custom md:w-1/2">
        <div className="p-8 rounded-lg">
          <div className="text-center mb-10">
            <h2 className="text-6xl font-medium text-center">Welcome back</h2>
            <p className="text-gray-500 mt-4">
              Step into our shopping metaverse
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmission}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isValid,
              dirty,
            }) => (
              <Form className="flex flex-col gap-8 bg-white/90 rounded-lg p-5">
                {/* Email Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <Mail className="w-5 h-5 text-gray-500" />
                  </span>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-500 mt-1 absolute -bottom-7 left-0"
                  />
                </div>
                {/* Password Input */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center">
                    <Lock className="w-5 h-5 text-gray-500" />
                  </span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`input ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-500" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-500" />
                    )}
                  </span>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-500  absolute -bottom-8 left-0"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!isValid || !dirty}
                  className={`w-full bg-[#ff00ee] text-white py-3 mt-10 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    !isValid || !dirty ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Login
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-sm text-gray-600 mt-6 text-center">
            Don't have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
