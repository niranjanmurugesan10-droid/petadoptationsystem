import { useState } from "react";

function Register() {
const [formData, setFormData] = useState({
name: "",
email: "",
password: ""
});

function handleChange(event) {
const { name, value } = event.target;


setFormData({
  ...formData,
  [name]: value
});


}

function handleSubmit(event) {
event.preventDefault();



console.log(formData);


}

return ( <div className="page"> <h1>Create Account</h1>


  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      value={formData.name}
      onChange={handleChange}
    />

    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange}
    />

    <input
      type="password"
      name="password"
      placeholder="Create password"
      value={formData.password}
      onChange={handleChange}
    />

    <button type="submit">
      Register
    </button>
  </form>
</div>


);
}

export default Register;
