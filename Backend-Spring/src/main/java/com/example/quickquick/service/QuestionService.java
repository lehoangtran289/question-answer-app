package com.example.quickquick.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.quickquick.model.Question;
import com.example.quickquick.repository.QuestionRepository;

@Service
public class QuestionService {

	@Autowired
	private QuestionRepository questionRepository;

	public ResponseEntity<?> findById(int questionId) {
		Optional<Question> question = questionRepository.findById(questionId);
		return question.map(ques -> ResponseEntity.ok().body(ques)) 
				.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	public List<Question> listQuestion() {
		return questionRepository.findAll();
	}

	public Question savePost(Question question) {
		return questionRepository.save(question);
	}

	public void deletePost(int questionId) {
		questionRepository.deleteById(questionId);
	}

}
