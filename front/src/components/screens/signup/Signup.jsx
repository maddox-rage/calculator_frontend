import Button from "../../ui/Button/Button.jsx";
import Field from "../../ui/Fields/Field.jsx";
import Loader from "../../ui/Loader.jsx";
import { useSignUp } from "./useSignup.js";

const SignUp = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register } = useSignUp();

  return (
    <div>
      <h2>Register</h2>
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field
          error={errors?.login?.message}
          name="login"
          register={register}
          options={{
            required: "login is required",
          }}
          type="text"
          placeholder="enter login"
        />
        <Field
          error={errors?.password?.message}
          name="password"
          register={register}
          options={{
            required: "password is required",
          }}
          type="password"
          placeholder="enter password"
        />
        <Field
          error={errors?.email?.message}
          name="email"
          register={register}
          options={{
            required: "email is required",
          }}
          type="text"
          placeholder="enter email"
        />
        <Field
          error={errors?.fullName?.message}
          name="fullName"
          register={register}
          options={{
            required: "fullName is required",
          }}
          type="text"
          placeholder="enter fullName"
        />
        <Field
          error={errors?.numberPhone?.message}
          name="numberPhone"
          register={register}
          options={{
            required: "numberPhone is required",
          }}
          type="text"
          placeholder="enter numberPhone"
        />
        <Button>Submit</Button>
        <a href="/auth">have a acc?</a>
      </form>
    </div>
  );
};
export default SignUp;
