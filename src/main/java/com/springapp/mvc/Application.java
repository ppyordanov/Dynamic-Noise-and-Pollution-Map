package com.springapp.mvc;

/**
 * Created by Peter Yordanov on 13.10.2014 г..
 */
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan
@EnableAutoConfiguration
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(new Object[]{Application.class, GreetingController.class}, args);
    }
}