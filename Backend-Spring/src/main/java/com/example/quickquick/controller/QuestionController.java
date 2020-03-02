package com.example.quickquick.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.quickquick.model.Question;
import com.example.quickquick.service.QuestionService;

@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:4200" })
@RestController
@RequestMapping("/api")
public class QuestionController {
	private final Logger log = LoggerFactory.getLogger(QuestionController.class);

	@Autowired
	private QuestionService questionService;

	@GetMapping("/question/list")
	public ResponseEntity<List<Question>> list() {
		List<Question> list = questionService.listQuestion();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/question/{id}")
	public ResponseEntity<?> getQuestion(@PathVariable("id") int id) {
		return ResponseEntity.ok().body(questionService.findById(id));
	}

	@PostMapping("/question")
	public ResponseEntity<Question> createQuestion(@Valid @RequestBody Question question) throws URISyntaxException {
		Question newQuestion = questionService.savePost(question);
		return ResponseEntity.created(new URI("/api/question" + newQuestion.getId())).body(newQuestion);
	}

	@PutMapping("/question/{id}")
	public ResponseEntity<Question> updateQuestion(@PathVariable("id") int id, @Valid @RequestBody Question question) {
		Question newQuestion = questionService.savePost(question);
		return ResponseEntity.ok().body(newQuestion);
	}

	@DeleteMapping("/question/{id}")
	public ResponseEntity<?> deleteQuestion(@PathVariable("id") int id) {
		questionService.deletePost(id);
		return ResponseEntity.ok().build();
	}

}
