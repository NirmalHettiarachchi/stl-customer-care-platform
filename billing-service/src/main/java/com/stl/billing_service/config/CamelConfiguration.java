package com.stl.billing_service.config;

import com.stl.billing_service.model.Bill;
import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;


@Component
public class CamelConfiguration extends RouteBuilder {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void configure() throws Exception {
        from("direct:sendNotification")
                .routeId("SendNotificationRoute")
                .log("Sending notification for paid bill: ${body}")
                .process(exchange -> {
                    Bill bill = exchange.getIn().getBody(Bill.class);
                    String username = bill.getUsername();
                    String message = "Your bill of " + bill.getAmount() + " has been successfully paid.";

                    String jwtToken = exchange.getIn().getHeader("Authorization", String.class);

                    if (jwtToken != null) {
                        log.info("JWT Token: " + jwtToken);
                        exchange.getIn().setHeader("Authorization", jwtToken);
                    } else {
                        log.warn("No JWT Token found in the request");
                    }

                    exchange.getIn().setHeader("username", username);
                    exchange.getIn().setHeader("type", "EMAIL");
                    exchange.getIn().setHeader("message", message);

                    String billJson = objectMapper.writeValueAsString(bill);
                    exchange.getIn().setBody(billJson, String.class);

                })
                .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                .setHeader(Exchange.CONTENT_TYPE, constant("application/json"))
                .toD("http://localhost:8081/notifications/send" +
                        "?username=${header.username}" +
                        "&type=${header.type}" +
                        "&message=${header.message}");
    }
}
