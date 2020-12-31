package com.fabianoyoschitaki.todo.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

//@Configuration
//@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter {
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // we'll use JWT to prevent cross site request forgery
            .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll() // any preflight request, we allow
                .anyRequest().authenticated()
                .and()
//                .formLogin().and()
                .httpBasic();
    }
}
