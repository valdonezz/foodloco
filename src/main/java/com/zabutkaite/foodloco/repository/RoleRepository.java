package com.zabutkaite.foodloco.repository;

import com.zabutkaite.foodloco.models.ERole;
import com.zabutkaite.foodloco.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface RoleRepository extends MongoRepository<Role, String> {
    Optional<Role> findByName(ERole name);
}
