import { useState } from "react";

function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="*******"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        <div>
          <button type="submit">Log In</button>
          <p>
            <span>Don&apos;t have an account? </span> <span>Register now</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
