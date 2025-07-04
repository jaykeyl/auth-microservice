package upb.edu.AuthMicroservice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import upb.edu.AuthMicroservice.interactors.UserInteractor;
import upb.edu.AuthMicroservice.models.Session;
import upb.edu.AuthMicroservice.models.User;
import upb.edu.AuthMicroservice.repositories.SessionRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    private final UserInteractor userInteractor;
    private final SessionRepository sessionRepository;

    @Autowired
    public UserService(UserInteractor userInteractor, SessionRepository sessionRepository) {
        this.userInteractor = userInteractor;
        this.sessionRepository = sessionRepository;
    }

    public User createUser(User user) {
        return userInteractor.createUser(user);
    }

    public ResponseEntity<Object> login(String email, String password) {
        Optional<User> userOpt = userInteractor.findByEmail(email);

        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(password)) {
            Map<String, Object> error = new HashMap<>();
            error.put("code", 401);
            error.put("msg", "Unauthorized");
            return ResponseEntity.status(401).body(error);
        }

        Session session = new Session();
        session.setId(UUID.randomUUID());
        session.setUserId(userOpt.get().getId());
        session.setCreatedAt(LocalDateTime.now());
        session.setExpiresAt(LocalDateTime.now().plusHours(2));
        session.setIsValid(true);
        sessionRepository.save(session);

        Map<String, Object> data = new HashMap<>();
        data.put("session", session.getId().toString());

        Map<String, Object> response = new HashMap<>();
        response.put("code", 200);
        response.put("msg", "Ok");
        response.put("data", data);

        return ResponseEntity.ok(response);
    }
}
