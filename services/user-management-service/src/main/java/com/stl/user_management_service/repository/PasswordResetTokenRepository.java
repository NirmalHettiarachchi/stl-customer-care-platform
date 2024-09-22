package com.stl.user_management_service.repository;

import com.stl.user_management_service.model.PasswordResetToken;
import com.stl.user_management_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    PasswordResetToken findByToken(String token);
    PasswordResetToken findByUser(User user);
}
