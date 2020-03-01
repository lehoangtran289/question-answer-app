import React, { Component } from "react";
import QuestionData from "../Service/QuestionData";
import ProgressBar from "react-bootstrap/ProgressBar";

class QuestionResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			question: null
		};
		this.handleReload = this.handleReload.bind(this);
	}

	componentDidMount() {
		QuestionData.getQuestionById(this.state.id)
			.then(response => {
                if (!response.data.body) {
                    window.alert("Cant find this question id");
                    this.props.history.push(`/`);
                }
				console.log("this", response.data.body);
				this.setState({
					question: response.data.body
				});
			})
			.catch(err => {
				console.log(err);
				window.alert(err.message);
			});
	}

	handleReload() {
		this.props.history.push(`/`);
	}

	render() {
		console.log("hi:", this.state.id, this.state.question);
		if (this.state.question) {
			const yespercent = ((this.state.question.yes * 100) / (this.state.question.yes + this.state.question.no)).toFixed();
			const nopercent = (100 - yespercent).toFixed();
			console.log(typeof yespercent);
			return (
				<div>
					<div className="container mt-5">
						<div className="row">
							<div className="col-12 text-center mt-5">
								<h1>{this.state.question.content}</h1>
							</div>
							<div className="col-12 text-center mt-5" style={{ paddingTop: "3rem" }}>
								<h3>Total votes: {this.state.question.yes + this.state.question.no}</h3>
							</div>
						</div>
						{yespercent !== "NaN" ? (
							<div className="row mt-4">
								<div className="col-12">
									<div className="progress" style={{ height: "40px" }}>
										<div
											className="progress-bar bg-success"
											role="progressbar"
											style={{ width: `${yespercent}%` }}
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<h5 style={{ paddingTop: "5px" }}>Yes: {yespercent}%</h5>
										</div>
										<div
											className="progress-bar bg-danger"
											role="progressbar"
											style={{ width: `${nopercent}%` }}
											aria-valuemin="0"
											aria-valuemax="100"
										>
											<h5 style={{ paddingTop: "5px" }}>No: {nopercent}%</h5>
										</div>
									</div>
								</div>
							</div>
						) : (
							<div></div>
						)}
					</div>
					<hr className="mt-5"></hr>
					<div className="container mt-5">
						<div className="row">
							<div className="col-12 text-center">
								<button className="btn btn-primary" onClick={this.handleReload}>
									Other Question
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		} else return <div></div>;
	}
}

export default QuestionResult;
