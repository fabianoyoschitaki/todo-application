package com.fabianoyoschitaki.todo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fabianoyoschitaki.todo.common.Todo;
import com.fabianoyoschitaki.todo.repository.TodoJpaRepository;

@Service
public class TodoJpaService {
    
    @Autowired
    private TodoJpaRepository todoJpaRepository;
    
    public List<Todo> findAll(String username){
        return todoJpaRepository.findByUsername(username);
    }

    public void deleteById(Long todoId) {
        todoJpaRepository.deleteById(todoId);
    }
    
    public Todo saveOrUpdate(Todo todo) {
        return todoJpaRepository.save(todo);
    }

    public Todo findById(String username, Long todoId) {
        return todoJpaRepository.findById(todoId).get();
    }
}
