import React, { Component } from "react";
import QuestionData from "../Service/QuestionData";

class Home extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		list: this.props.questionsList,
	// 		question: this.props.questionsList[Math.floor(Math.random() * this.props.questionsList.length)]
	// 	};
	// 	this.handleReload = this.handleReload.bind(this);
	// 	this.handleYes = this.handleYes.bind(this);
	// 	this.handleNo = this.handleNo.bind(this);
	// }

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			question: "",
			isLoading: true
		};
		this.refreshPosts = this.refreshPosts.bind(this);
		this.handleReload = this.handleReload.bind(this);
		this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
        this.handleShowResult = this.handleShowResult.bind(this);
	}

	handleReload = () => {
		const question = this.state.list[Math.floor(Math.random() * this.state.list.length)];
		this.setState({
			question: question
		});
	};

	handleYes = () => {
		let updateQues = this.state.question;
		updateQues.yes += 1;
		// console.log(updateQues);
		QuestionData.updateQuestionById(updateQues.id, updateQues).then(() => {
			this.props.history.push(`/questions/${updateQues.id}`);
		});
	};

	handleNo = () => {
		let updateQues = this.state.question;
		updateQues.no += 1;
		// console.log(updateQues);
		QuestionData.updateQuestionById(updateQues.id, updateQues).then(() => {
			this.props.history.push(`/questions/${updateQues.id}`);
		});
    };
    
    handleShowResult = () => {
        this.props.history.push(`/questions/${this.state.question.id}`);
    }

	componentDidMount() {
		this.refreshPosts();
	}

	refreshPosts = () => {
		QuestionData.getAllQuestions().then(response => {
			console.log(response);
			this.setState({
                list: response.data,
                question: response.data[Math.floor(Math.random() * response.data.length)],
				isLoading: !this.state.isLoading
			});
		});
	};

	render() {
        console.log(this.state.list);
		console.log("ques: ", this.state.question);
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-12 text-center mt-5">
							<h1>{this.state.question.content}</h1>
						</div>
					</div>
					<div className="row mt-5">
						<div className="col-6 text-center mt-5">
							<button className="btn btn-success" onClick={this.handleYes}>
								<h4>Yes/Right/Good</h4>
							</button>
						</div>
						<div className="col-6 text-center mt-5">
							<button className="btn btn-danger" onClick={this.handleNo}>
								<h4>No/Wrong/Bad</h4>
							</button>
						</div>
					</div>
				</div>
				<hr className="mt-5"></hr>
				<div className="container mt-5">
					<div className="row">
						<div className="col-6 text-right">
							<button className="btn" onClick={this.handleReload}>
								Other Question
							</button>
						</div>
                        <div className="col-6 text-left">
							<button className="btn" onClick={this.handleShowResult}>
								Show Result
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
