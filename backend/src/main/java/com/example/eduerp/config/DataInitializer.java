package com.example.eduerp.config;

import com.example.eduerp.entity.User;
import com.example.eduerp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("test@gmail.com").isEmpty()) {
                User testUser = new User();
                testUser.setName("Test User");
                testUser.setEmail("test@gmail.com");
                testUser.setPassword(passwordEncoder.encode("123456"));
                testUser.setRole("ADMIN");
                testUser.setStatus("ACTIVE");
                userRepository.save(testUser);
                System.out.println("Test user created: test@gmail.com / 123456");
            }
        };
    }
}
