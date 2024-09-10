import Button from "../../ui/button/Button";
import Field from "../../ui/Fields/Field.jsx";
import Loader from "../../ui/Loader.jsx";
import { useSignIn } from "./useSignin.js";

const SignIn = () => {
  const { errors, handleSubmit, isLoading, onSubmit, register } = useSignIn();
  return (
    <div>
      <h1>Login</h1>
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
        <Button>Submit</Button>
      </form>
      <a href="/register">dont have a acc?</a>
    </div>
  );
};
export default SignIn;
