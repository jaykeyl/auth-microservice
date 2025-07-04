package upb.edu.AuthMicroservice.routes;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import upb.edu.AuthMicroservice.controllers.RoleController;
import upb.edu.AuthMicroservice.controllers.UserController;

import static org.springframework.web.servlet.function.RouterFunctions.route;
import static org.springframework.web.servlet.function.RequestPredicates.POST;

import upb.edu.AuthMicroservice.controllers.SessionController;
import upb.edu.AuthMicroservice.models.Response;
import upb.edu.AuthMicroservice.models.User;

@Configuration
public class Routes {

    private final UserController userController;
    private final SessionController sessionController;

    public Routes(UserController userController,
                  SessionController sessionController) {
        this.userController = userController;
        this.sessionController = sessionController;
    }

    @Bean
    public RouterFunction<ServerResponse> routerFunction(RoleController roleController) {
        return RouterFunctions.route()
                .path("/api", builder -> builder.add(RoleRoutes.roleRoutes(roleController)))
                .build();

    @Bean
    public RouterFunction<ServerResponse> userRoutes(UserController controller) {
        return route()
                .POST("/register-user", request -> {
                    User user = request.body(User.class);
                    userController.registerUser(user);
                    return ServerResponse
                            .ok()
                            .body(new Response("201", "OK"));
                })
                .build();
    }

    @Bean
    public RouterFunction<ServerResponse> sessionRoutes() {
        return route()
                .POST("/generate-session", sessionController::generateSession)
                .build();
    }
}

