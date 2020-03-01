import React, { Component } from "react";
import QuestionData from "../Service/QuestionData";

class QuestionAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			content: "",
			remain: 200
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInput = this.handleInput.bind(this);
	}

	handleSubmit = event => {
		event.preventDefault();
		let newQuestion = {
			content: this.state.content
		};
		console.log(newQuestion);
		QuestionData.createQuestion(newQuestion).then(() => {
            this.props.history.push(`/`);
		});
	};

	handleInput = event => {
		let temp = "";
		temp = event.target.value;
		this.setState({
			content: event.target.value,
			remain: 200 - event.target.value.length
		});
		console.log(temp);
	};

	render() {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-12">
						<h2>Ask community a question</h2>
					</div>
				</div>
				<div className="row">
					<div className="col-12 mt-3">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<textarea className="form-control" rows="6" maxLength="200" value={this.state.content} onChange={this.handleInput} />
							</div>
							{this.state.remain === 0 ? <p>200 characters reached</p> : <p>{this.state.remain}/200 characters left</p>}
							<button type="submit" className="btn btn-primary">
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default QuestionAdd;
