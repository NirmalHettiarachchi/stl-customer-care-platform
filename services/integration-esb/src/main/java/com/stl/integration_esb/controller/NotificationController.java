package com.stl.integration_esb.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.camel.Exchange;
import org.apache.camel.ProducerTemplate;
import org.apache.camel.support.DefaultExchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class NotificationController {

    @Autowired
    private ProducerTemplate producerTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("processNotification")
    public ResponseEntity<?> processNotification(@RequestBody Map<String, Object> body,
                                                 @RequestHeader("Authorization") String authorization) throws JsonProcessingException {
        String jsonBody = objectMapper.writeValueAsString(body);
        System.out.println("Received JSON Body: " + jsonBody);

        Exchange exchange = new DefaultExchange(producerTemplate.getCamelContext());
        exchange.getIn().setBody(jsonBody);
        exchange.getIn().setHeader("Authorization", authorization);

        producerTemplate.send("direct:processNotification", exchange);

        return ResponseEntity.ok().build();
    }


}
