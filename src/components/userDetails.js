import React, { Component } from "react";

export default class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }

  componentDidMount() {
    //user details api
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }

  render() {
    return (
      <div>
        <h3>User Profile</h3>

        <h2>Name :</h2>
        <h4>{this.state.userData.fname} </h4>

        <h2>Gender:</h2>
        <h4>{this.state.userData.gender}</h4>

        <h2>Country:</h2>
        <h4>{this.state.userData.country}</h4>

        <h2>Phone:</h2>
        <h4>{this.state.userData.phone}</h4>

        <h2>Email :</h2>
        <h4>{this.state.userData.email}</h4>
        <br />
        <br />
        <br />
        <div className="d-grid">
          <a class="btn btn-primary" href="/sign-in" role="button">
            Log Out
          </a>
        </div>
      </div>
    );
  }
}
