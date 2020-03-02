package com.example.quickquick.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.quickquick.model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

}
