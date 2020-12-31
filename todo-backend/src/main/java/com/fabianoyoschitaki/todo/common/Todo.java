package com.fabianoyoschitaki.todo.common;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Todo {
    
    @Id
    @GeneratedValue // a sequence would be created and it would be used to set values into id
    private Long id;
    
    private String username;
    private String description;
    private Date targetDate;
    private boolean done;
}
