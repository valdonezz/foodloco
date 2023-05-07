package com.zabutkaite.foodloco.payload.request;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SignupRequest {

    private String username;
    private String email;
    private Set<String> roles;
    private String password;

}
