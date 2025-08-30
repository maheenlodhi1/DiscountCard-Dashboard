import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import Spinner from "../Loaders/Spinner";
import ErrorAlert from "../Alerts/ErrorAlert";

export default function LoginForm({ error, loading, onLogin }) {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Please enter a valid email address.")
          .required("Please enter a valid email address."),
        password: Yup.string().required("Please enter a password."),
      })}
      onSubmit={(values) => {
        onLogin(values);
      }}
    >
      {({}) => (
        <Form className="space-y-6" action="#" method="POST">
          {error && <ErrorAlert>{error}</ErrorAlert>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 ring-1 ring-gray-400 outline-none focus:ring-2 focus:ring-primary text-gray-900 shadow-sm  placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
            <ErrorMessage
              component={"p"}
              name="email"
              className="text-sm text-red-700"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              {/* <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-primary hover:text-primary"
                >
                  Forgot password?
                </a>
              </div> */}
            </div>
            <div className="mt-2">
              <Field
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-4 py-1.5 ring-1 ring-gray-400 outline-none focus:ring-2 focus:ring-primary text-gray-900 shadow-sm ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
            <ErrorMessage
              component={"p"}
              name="password"
              className="text-sm text-red-700"
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
