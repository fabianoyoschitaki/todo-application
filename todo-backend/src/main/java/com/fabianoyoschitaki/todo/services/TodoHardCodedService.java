package com.fabianoyoschitaki.todo.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fabianoyoschitaki.todo.common.Todo;

@Service
public class TodoHardCodedService {
    
    private static long COUNTER = 1;
    private static List<Todo> TODOS = new ArrayList<>();
    static {
        TODOS.add(new Todo(COUNTER++, "fabiano", "Learn React", new Date(), false));
        TODOS.add(new Todo(COUNTER++, "fabiano", "Learn Java", new Date(), false));
        TODOS.add(new Todo(COUNTER++, "fabiano", "Learn Docker", new Date(), false));
        TODOS.add(new Todo(COUNTER++, "fabiano", "Learn Kubernetes", new Date(), false));
    }
    
    public List<Todo> findAll(){
        return TODOS;
    }

    public Todo deleteById(String username, Long todoId) {
        Todo todo = findById(username, todoId);
        if (todo == null)
            return null;
        
        if (TODOS.remove(todo)){
            return todo;
        }
        
        return null;
    }
    
    public Todo saveOrUpdate(Todo todo) {
        if (todo.getId() == -1 || todo.getId() == 0) {
            todo.setId(COUNTER++);
            TODOS.add(todo);
        } else {
            deleteById(null, todo.getId());
            TODOS.add(todo);
        }
        return todo;
    }

    public Todo findById(String username, Long todoId) {
        return TODOS.stream()
            .filter(todo -> todoId.equals(todo.getId())).findFirst()
            .orElse(null);
    }
}
