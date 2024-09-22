package com.stl.notification_service.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    @KafkaListener(topics = "example_topic", groupId = "example-group")
    public void consume(String message) {
        System.out.println("Consumed message: " + message);
    }
}
