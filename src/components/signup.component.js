import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      gender: "", 
      country: "",
      phone: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //submit function for sign up
  handleSubmit(e) {
    e.preventDefault();
    const { fname, gender, country, phone, email, password } = this.state;
    console.log({ fname, gender, country, phone, email, password });
    //register api
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        gender, 
        country,
        phone,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        // eslint-disable-next-line eqeqeq
        if (data.status == "ok") {
          alert("Register success");
          window.location.href = "./sign-in";
        }else{
          alert("Register fail. Something went wrong.");
        }
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Register</h3>

        <div className="mb-3">
          <label>Full name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Full name"
            onChange={(e) => this.setState({ fname: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Gender</label>
          <input
            type="text"
            className="form-control"
            placeholder="Gender"
            onChange={(e) => this.setState({ gender: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Country</label>
          <input
            type="text"
            className="form-control"
            placeholder="Country"
            onChange={(e) => this.setState({ country: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Phone number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone number"
            onChange={(e) => this.setState({ phone: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered? <a href="/sign-in">Log In</a>
        </p>
      </form>
    );
  }
}
