import React, { Component } from "react";
import "./App.css";

class AppNavbar extends React.Component {

	render() {
		return (
			<div className="navbar navbar-expand-md navbar-dark bg-dark">
				<a className="navbar-brand" href="/">
					<h3>Quick Quick</h3>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarsExampleDefault"
					aria-controls="navbarsExampleDefault"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarsExampleDefault">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<a className="nav-link my-2 my-lg-0" href="/">
								<div className="Home">Home</div> <span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/ask">
								Add a question
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/questions">
								All Questions
							</a>
						</li>
					</ul>
					
				</div>
			</div>
		);
	}
}

export default AppNavbar;
