package com.example.quickquick.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.quickquick.model.Question;
import com.example.quickquick.repository.QuestionRepository;

@Component
public class Initializer implements CommandLineRunner {
	@Autowired
	private QuestionRepository questionRepository;

	@Override
	public void run(String... args) throws Exception {
		questionRepository.save(new Question("This is the first question"));
		questionRepository.save(new Question("This is the second question"));
		questionRepository.save(new Question("This is the third question"));
		questionRepository.save(new Question("This is the fourth question"));
		questionRepository.save(new Question("This is the fifth question"));
		questionRepository.save(new Question("This is the sixth question"));
		questionRepository.save(new Question("This is the seventh question"));
		questionRepository.findAll().forEach(System.out::println);
	}
}
