    package com.fabianoyoschitaki.todo.resources;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fabianoyoschitaki.todo.common.HelloWorldBean;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class HelloWorldResource {
    
    @GetMapping("/hello-world")
    public String helloWorld() {
        return "Hello World";
    }
    
    @GetMapping("/hello-world-bean")
    public HelloWorldBean helloWorldBean() {
        return new HelloWorldBean("Hello World Bean");
    }
    
    @GetMapping("/hello-world-path/{name}")
    public HelloWorldBean helloWorldPath(@PathVariable(name = "name") final String name) {
        log.info("Hello world path: {}", name);
        return new HelloWorldBean(String.format("Hello World Path, %s", name));
    }
}
