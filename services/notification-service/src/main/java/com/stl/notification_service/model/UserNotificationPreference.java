package com.stl.notification_service.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class UserNotificationPreference {

    @Id
    private String username;
    private boolean emailEnabled;
    private boolean smsEnabled;
    private boolean pushEnabled;
}
