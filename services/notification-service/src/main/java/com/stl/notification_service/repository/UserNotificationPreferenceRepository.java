package com.stl.notification_service.repository;

import com.stl.notification_service.model.UserNotificationPreference;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserNotificationPreferenceRepository extends JpaRepository<UserNotificationPreference, String> {
    UserNotificationPreference findByUsername(String username);
}
