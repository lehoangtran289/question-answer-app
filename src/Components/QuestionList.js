import React, { Component } from "react";
import QuestionData from "../Service/QuestionData";
import "./QuestionList.css";

class QuestionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
        QuestionData.getAllQuestions().then(response => {
			console.log(response);
			this.setState({
				list: response.data,
			});
		});
    }

	render() {
		console.log(this.state.list);
		const list = this.state.list.map(ques => {
			return (
				<tr key={ques.id}>
					<td>{ques.id}</td>
					<td>{ques.content}</td>
                    <td>{ques.yes}</td>
                    <td>{ques.no}</td>
				</tr>
			);
        });

		return (
			<div>
				<div className="container">
					<div className="row">
						<h3 className="col-12">All Questions</h3>
					</div>
				</div>
				<div className="container mt-4">
					<table className="table">
						<thead>
							<tr>
								<th>Id</th>
								<th>Content</th>
								<th>Right/Yes</th>
								<th>Wrong/No</th>
							</tr>
						</thead>
						<tbody>{list}</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default QuestionList;
