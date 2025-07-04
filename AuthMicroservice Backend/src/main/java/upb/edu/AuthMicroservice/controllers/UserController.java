package upb.edu.AuthMicroservice.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import upb.edu.AuthMicroservice.models.LoginRequest;
import upb.edu.AuthMicroservice.models.User;
import upb.edu.AuthMicroservice.services.UserService;

@Component
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    public User registerUser(User user) {
        return userService.createUser(user);
    }

    public ResponseEntity<Object> login(LoginRequest loginRequest) {
        return userService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
