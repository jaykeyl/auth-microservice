package upb.edu.AuthMicroservice.routes;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.web.servlet.function.RouterFunctions.route;

import upb.edu.AuthMicroservice.controllers.UserController;
import upb.edu.AuthMicroservice.controllers.SessionController;
import upb.edu.AuthMicroservice.models.LoginRequest;
import upb.edu.AuthMicroservice.models.Response;
import upb.edu.AuthMicroservice.models.User;

import org.springframework.http.ResponseEntity;

@Configuration
public class Routes {

    private final UserController userController;
    private final SessionController sessionController;

    public Routes(UserController userController, SessionController sessionController) {
        this.userController = userController;
        this.sessionController = sessionController;
    }

    @Bean
    public RouterFunction<ServerResponse> userRoutes() {
        return route()
                .POST("/register-user", request -> {
                    User user = request.body(User.class);
                    User created = userController.registerUser(user);
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

    @Bean
    public RouterFunction<ServerResponse> sessionRoutes() {
        return route()
                .POST("/generate-session", request -> {
                    return sessionController.generateSession(request);
                })
                .build();
    }
}
