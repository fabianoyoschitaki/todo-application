package com.fabianoyoschitaki.todo.common;

public class HelloWorldBean {
    
    private String message;
    
    public HelloWorldBean(String message) {
        super();
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
