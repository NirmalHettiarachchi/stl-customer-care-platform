package com.stl.notification_service.controller;

import com.stl.notification_service.model.Notification;
import com.stl.notification_service.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "*")
public class KafkaController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/send")
    public String sendNotification(@RequestParam("username") String username,
                                   @RequestParam("type") String type,
                                   @RequestParam("message") String message) {
        notificationService.notifyUser(username, type, message);
        System.out.println("Notification sent successfully!");
        return "Notification sent successfully!";
    }

    @PostMapping("/preferences")
    public String updatePreferences(@RequestParam("email") boolean email,
                                    @RequestParam("sms") boolean sms,
                                    @RequestParam("push") boolean push) {
        String username = getCurrentUsername();
        notificationService.updatePreferences(username, email, sms, push);
        return "Preferences updated successfully!";
    }

    @GetMapping("")
    public List<Notification> getUserNotifications() {
        String username = getCurrentUsername();
        return notificationService.getNotificationsForUser(username);
    }

    private String getCurrentUsername() {
        Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principle instanceof UserDetails) {
            return ((UserDetails) principle).getUsername();
        } else {
            return principle.toString();
        }
    }
}
