package upb.edu.AuthMicroservice.routes;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.web.servlet.function.RouterFunctions.route;

import upb.edu.AuthMicroservice.controllers.UserController;
import upb.edu.AuthMicroservice.controllers.SessionController;

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
                .POST("/register-user", userController::registerUser)
                .POST("/login", userController::login)
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> sessionRoutes() {
        return route()
                .POST("/generate-session", sessionController::generateSession)
                .build();
    }
}
