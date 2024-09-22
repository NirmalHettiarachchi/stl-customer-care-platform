package com.stl.notification_service.service;

import com.stl.notification_service.model.UserNotificationPreference;
import com.stl.notification_service.repository.UserNotificationPreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private static final String EMAIL_TOPIC = "email_notifications";
    private static final String SMS_TOPIC = "sms_notifications";
    private static final String PUSH_TOPIC = "push_notifications";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private UserNotificationPreferenceRepository userNotificationPreferenceRepository;

    public void sendEmailNotification(String message) {
        kafkaTemplate.send(EMAIL_TOPIC, message);
    }

    public void sendSmsNotification(String message) {
        kafkaTemplate.send(SMS_TOPIC, message);
    }

    public void sendPushNotification(String message) {
        kafkaTemplate.send(PUSH_TOPIC, message);
    }

    public void notifyUser(String username, String notificationType, String message) {
        UserNotificationPreference preference = userNotificationPreferenceRepository.findByUsername(username);
        if(preference == null) {
            throw  new IllegalArgumentException("User preferences not found for username: " + username);
        }

        switch (notificationType.toLowerCase()) {
            case "email":
                if (preference.isEmailEnabled()) {
                    sendEmailNotification(message);
                }
                break;
            case "sms":
                if (preference.isSmsEnabled()) {
                    sendSmsNotification(message);
                }
                break;
            case "push":
                if (preference.isPushEnabled()) {
                    sendPushNotification(message);
                }
                break;
            default:
                throw new IllegalArgumentException("Unknown notification type: " + notificationType);
        }
    }

    public void updatePreferences(String username, boolean email, boolean sms, boolean push) {
        UserNotificationPreference preference = userNotificationPreferenceRepository.findByUsername(username);
        if(preference == null) {
            preference = new UserNotificationPreference();
            preference.setUsername(username);
        }
        preference.setEmailEnabled(email);
        preference.setSmsEnabled(sms);
        preference.setPushEnabled(push);
        userNotificationPreferenceRepository.save(preference);
    }
}
