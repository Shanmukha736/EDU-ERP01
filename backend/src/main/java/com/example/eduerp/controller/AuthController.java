package com.example.eduerp.controller;

import com.example.eduerp.dto.AuthResponse;
import com.example.eduerp.dto.LoginRequest;
import com.example.eduerp.dto.SignupRequest;
import com.example.eduerp.entity.User;
import com.example.eduerp.service.AuthService;
import com.example.eduerp.config.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtils jwtUtils;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody SignupRequest request) {
        try {
            User user = authService.registerUser(request);
            String token = jwtUtils.generateToken(user.getEmail());
            return ResponseEntity.ok(new AuthResponse("User registered successfully", user, token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage(), null, null));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        try {
            User user = authService.authenticateUser(request);
            String token = jwtUtils.generateToken(user.getEmail());
            return ResponseEntity.ok(new AuthResponse("Login successful", user, token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(new AuthResponse(e.getMessage(), null, null));
        }
    }
}
