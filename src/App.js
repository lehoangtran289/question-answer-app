import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AppNavbar from "./AppNavbar";
import QuestionList from "./Components/QuestionList";
import QuestionData from "./Service/QuestionData";
import Home from "./Components/Home";
import QuestionAdd from "./Components/QuestionAdd";
import QuestionResult from "./Components/QuestionResult";

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<AppNavbar />
				<div className="container mt-5">
					<Router>
						<Switch>
							<Route path="/" exact component={Home} />} />
							<Route path="/questions" exact component={QuestionList} />
							<Route path="/ask" exact component={QuestionAdd} />
							<Route path="/questions/:id" component={QuestionResult} />
						</Switch>
					</Router>
				</div>
			</div>
		);
	}
}

export default App;
