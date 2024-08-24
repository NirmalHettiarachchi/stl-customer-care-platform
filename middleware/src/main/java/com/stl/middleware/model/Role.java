package com.stl.middleware.model;

import org.springframework.security.core.GrantedAuthority;

public class Role implements GrantedAuthority {

    private String name;

    @Override
    public String getAuthority() {
        return name;
    }
}
