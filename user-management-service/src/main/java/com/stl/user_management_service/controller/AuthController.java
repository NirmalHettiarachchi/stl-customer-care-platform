package com.stl.user_management_service.controller;

import com.stl.user_management_service.model.PasswordResetToken;
import com.stl.user_management_service.model.User;
import com.stl.user_management_service.security.JwtTokenUtil;
import com.stl.user_management_service.service.JwtUserDetailsService;
import com.stl.user_management_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User saveUser(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping("/authenticate")
    public String createAuthenticationToken(@RequestBody User user) throws Exception {
        authenticate(user.getUsername(), user.getPassword());
        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        return jwtTokenUtil.generateToken(userDetails);
    }

    @PostMapping("/password-reset")
    public String resetPassword() {

        String username = getCurrentUsername();
        User user = userService.findByUsername(username);

        if(user == null) {
            return "User not found";
        }
        String token = UUID.randomUUID().toString();
        userService.createPasswordResetTokenForUser(user, token);

        return "Password reset token: " + token;
    }

    private String getCurrentUsername() {
        Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principle instanceof UserDetails) {
            return ((UserDetails) principle).getUsername();
        } else {
            return principle.toString();
        }
    }

    @PostMapping("/password-reset/confirm")
    public String confirmPasswordReset(@RequestParam("token") String token, @RequestParam("newPassword") String newPassword) {
        String result = userService.validatePasswordResetToken(token);
        if(result != null) {
            return result;
        }

        PasswordResetToken passToken = userService.findByToken(token);
        User user = passToken.getUser();
        if(user == null) {
            return "Invalid token";
        }

        userService.changeUserPassword(user, newPassword);
        return "Password successfully reset";
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (Exception e) {
            throw new Exception("INVAlID_CREDENTIALS", e);
        }
    }
}
