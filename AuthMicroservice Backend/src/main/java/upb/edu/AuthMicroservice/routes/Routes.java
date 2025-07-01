package upb.edu.AuthMicroservice.routes;

import static org.springframework.web.servlet.function.RouterFunctions.route;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;
import org.springframework.web.servlet.function.RouterFunctions;
import upb.edu.AuthMicroservice.controllers.RoleController;

@Configuration
public class Routes {

    //@Autowired
    //private RoleRoutes roleRoutes;

    @Bean
    public RouterFunction<ServerResponse> routerFunction(RoleController roleController) {
        return RouterFunctions.route()
                .path("/api", builder -> builder.add(RoleRoutes.roleRoutes(roleController)))
                .build();
    }

}
