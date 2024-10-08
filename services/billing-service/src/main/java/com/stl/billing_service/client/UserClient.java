package com.stl.billing_service.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserClient {

    @Autowired
    private RestTemplate restTemplate;

    public String getUserInfo(String username) {
        String url = "http://user-management-service:8080/users/" + username;
        return restTemplate.getForObject(url, String.class);
    }
}
