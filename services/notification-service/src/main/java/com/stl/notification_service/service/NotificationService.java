package com.stl.notification_service.service;

import com.stl.notification_service.model.Notification;
import com.stl.notification_service.model.UserNotificationPreference;
import com.stl.notification_service.repository.NotificationRepository;
import com.stl.notification_service.repository.UserNotificationPreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private static final String EMAIL_TOPIC = "email_notifications";
    private static final String SMS_TOPIC = "sms_notifications";
    private static final String PUSH_TOPIC = "push_notifications";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private UserNotificationPreferenceRepository userNotificationPreferenceRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public void sendEmailNotification(String username, String message) {
        kafkaTemplate.send(EMAIL_TOPIC, message);
        Notification notification = new Notification();
        notification.setUsername(username);
        notification.setNotificationType(EMAIL_TOPIC);
        notification.setContent(message);
        notificationRepository.save(notification);
    }

    public void sendSmsNotification(String username, String message) {
        kafkaTemplate.send(SMS_TOPIC, message);
        Notification notification = new Notification();
        notification.setUsername(username);
        notification.setNotificationType(SMS_TOPIC);
        notification.setContent(message);
        notificationRepository.save(notification);
    }

    public void sendPushNotification(String username, String message) {
        kafkaTemplate.send(PUSH_TOPIC, message);
        Notification notification = new Notification();
        notification.setUsername(username);
        notification.setNotificationType(PUSH_TOPIC);
        notification.setContent(message);
        notificationRepository.save(notification);
    }

    public void notifyUser(String username, String notificationType, String message) {
        UserNotificationPreference preference = userNotificationPreferenceRepository.findByUsername(username);
        if(preference == null) {
            throw  new IllegalArgumentException("User preferences not found for username: " + username);
        }

        switch (notificationType.toLowerCase()) {
            case "email":
                if (preference.isEmailEnabled()) {
                    sendEmailNotification(username, message);
                }
                break;
            case "sms":
                if (preference.isSmsEnabled()) {
                    sendSmsNotification(username, message);
                }
                break;
            case "push":
                if (preference.isPushEnabled()) {
                    sendPushNotification(username, message);
                }
                break;
            default:
                throw new IllegalArgumentException("Unknown notification type: " + notificationType);
        }
    }

    public List<Notification> getNotificationsForUser(String username) {
        return notificationRepository.findByUsername(username);
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
