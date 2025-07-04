package upb.edu.AuthMicroservice.routes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import upb.edu.AuthMicroservice.controllers.UserController;
import upb.edu.AuthMicroservice.models.LoginRequest;
import upb.edu.AuthMicroservice.models.Response;
import upb.edu.AuthMicroservice.models.User;

import org.springframework.http.ResponseEntity;

import static org.springframework.web.servlet.function.RouterFunctions.route;

@Configuration
public class Routes {

    @Autowired
    private UserController userController;

    @Bean
    public RouterFunction<ServerResponse> userRoutes() {
        return route()
                .POST("/register-user", request -> {
                    User user = request.body(User.class);
                    userController.registerUser(user);
                    return ServerResponse
                            .status(201)
                            .body(new Response("201", "OK"));
                })
                .POST("/login", request -> {
                    LoginRequest dto = request.body(LoginRequest.class);
                    ResponseEntity<Object> serviceResp = userController.login(dto);

                    return ServerResponse
                            .status(serviceResp.getStatusCodeValue())
                            .body(serviceResp.getBody());
                })
                .build();
    }
}
