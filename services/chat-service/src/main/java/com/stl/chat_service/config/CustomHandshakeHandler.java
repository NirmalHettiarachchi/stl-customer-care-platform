package com.stl.chat_service.config;

import java.security.Principal;
import java.util.List;
import java.util.Map;

import com.stl.chat_service.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

@Component
public class CustomHandshakeHandler extends DefaultHandshakeHandler {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        System.out.println("CustomHandshakeHandler: determineUser called");

        String token = extractToken(request);

        if (token != null && jwtTokenUtil.validateToken(token)) {
            return null;
        } else {
            return null;
        }
    }

    private String extractToken(ServerHttpRequest request) {
        List<String> tokens = request.getHeaders().get("Authorization");
        if (tokens != null && !tokens.isEmpty()) {
            String token = tokens.get(0).replace("Bearer ", "");
            return token;
        }
        if (request.getURI().getQuery() != null) {
            String[] queryParams = request.getURI().getQuery().split("&");
            for (String param : queryParams) {
                if (param.startsWith("token=")) {
                    String token = param.substring(6);
                    return token;
                }
            }
        }
        return null;
    }
}
