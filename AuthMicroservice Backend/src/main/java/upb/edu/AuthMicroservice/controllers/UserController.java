package upb.edu.AuthMicroservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import upb.edu.AuthMicroservice.models.LoginRequest;
import upb.edu.AuthMicroservice.models.User;
import upb.edu.AuthMicroservice.services.UserService;

@Component
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register-user")
    public User registerUser(@RequestBody User user) {
        log.info("Registering new user: {}", user.getEmail());
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        log.info("Login attempt for: {}", loginRequest.getEmail());
        return userService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
