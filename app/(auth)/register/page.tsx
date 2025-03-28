"use client";

import AuthForm from "@/components/AuthForm";
import { register } from "@/lib/actions/auth";
import { registerSchema } from "@/lib/validations";

const Register = () => {
  return (
    <AuthForm
      type="REGISTER"
      schema={registerSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={register}
    />
  );
};
export default Register;
