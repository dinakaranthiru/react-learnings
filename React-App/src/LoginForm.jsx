import { useForm } from "react-hook-form";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert(`Hello ${data.name}, your email is ${data.email}`);
  };

  const passwordVAlue = watch("password","")

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}

        <p>{passwordVAlue}</p>
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;