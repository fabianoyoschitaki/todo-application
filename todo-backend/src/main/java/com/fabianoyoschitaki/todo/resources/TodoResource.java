package com.fabianoyoschitaki.todo.resources;

import java.net.URI;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.fabianoyoschitaki.todo.common.Todo;
//import com.fabianoyoschitaki.todo.services.TodoHardCodedService;
import com.fabianoyoschitaki.todo.services.TodoJpaService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodoResource {
    
//    @Autowired
//    private TodoHardCodedService todoService;
    
    @Autowired
    private TodoJpaService todoService;
    
    @GetMapping("/users/{username}/todos")
    public List<Todo> getAllTodos(@PathVariable(name = "username") String username){
        log.info("getAllTodos for user {}", username);
        return todoService.findAll(username);
    }
    
    @GetMapping("/users/{username}/todos/{todoId}")
    public Todo getTodoById(@PathVariable(name = "username") String username, @PathVariable(name = "todoId") Long todoId){
        log.info("Get Todo {} for user {}", todoId, username);
        return todoService.findById(username, todoId);
    }
    
    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable(name = "username") String username, 
            @RequestBody Todo todo){
        
        // FE does not populate username
        todo.setUsername(username);
        Todo createdTodo = todoService.saveOrUpdate(todo);
        
        // Location
        // Get current resource url
        ///{id}
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
        
        return ResponseEntity.created(uri).build();
    }
    
    @PutMapping("/users/{username}/todos/{todoId}")
    public ResponseEntity<Todo> updateTodo(
            @PathVariable(name = "username") String username, 
            @PathVariable(name = "todoId") Long todoId,
            @RequestBody Todo todo){
        // FE does not populate username
        todo.setUsername(username);
        Todo updatedTodo = todoService.saveOrUpdate(todo);
        return new ResponseEntity<Todo>(updatedTodo, HttpStatus.OK);
    }
    
    @DeleteMapping("/users/{username}/todos/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable(name = "username") String username, @PathVariable(name = "todoId") Long todoId){
        log.info("Delete Todo {} for user {}", todoId, username);
        todoService.deleteById(todoId);
        return ResponseEntity.noContent().build();
    }
}
