package upb.edu.AuthMicroservice.routes;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;

import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;
import org.springframework.web.servlet.function.RouterFunctions;
import upb.edu.AuthMicroservice.controllers.RoleController;
import upb.edu.AuthMicroservice.controllers.UserController;
import static org.springframework.web.servlet.function.RouterFunctions.route;



@Configuration
public class Routes {

    @Bean
    public RouterFunction<ServerResponse> routerFunction(RoleController roleController) {
        return RouterFunctions.route()
                .path("/api", builder -> builder.add(RoleRoutes.roleRoutes(roleController)))
                .build();

    @Bean
    public RouterFunction<ServerResponse> userRoutes(UserController controller) {
        return route()
            .POST("/register-user", controller::registerUser)
            .build();
    }
}
