package com.fabianoyoschitaki.todo.resources;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fabianoyoschitaki.todo.common.AuthenticationBean;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BasicAuthResource {
    
    @GetMapping("/basicauth")
    public AuthenticationBean authenticationBean(){
        return new AuthenticationBean("You're authenticated!");
    }
    
}
