package com.stl.integration_esb.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.camel.Exchange;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Map;


@Component
public class CamelConfiguration extends RouteBuilder {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void configure() throws Exception {
        from("direct:processNotification")
                .routeId("ProcessNotificationRoute")
                .log("Received notification for request: ${body}")
                .process(exchange -> {
                    Map<String, Object> billData = objectMapper.readValue(
                            exchange.getIn().getBody(String.class),
                            new TypeReference<Map<String, Object>>() {});

                    String username = (String) billData.get("username");
                    BigDecimal amount = new BigDecimal(billData.get("amount").toString());
                    String message = "Your bill of " + amount + " has been successfully paid.";

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

                    String billJson = objectMapper.writeValueAsString(billData);
                    exchange.getIn().setBody(billJson, String.class);

                })
                .doTry()
                    .setHeader(Exchange.HTTP_METHOD, constant("POST"))
                    .setHeader(Exchange.CONTENT_TYPE, constant("application/json"))
                    .toD("http://localhost:8081/notifications/send" +
                            "?username=${header.username}" +
                            "&type=${header.type}" +
                            "&message=${header.message}")
                .doCatch(Exception.class)
                    .log("Error occurred while processing notification: ${exception.message}")
                    .setBody(simple("{\"error\": \"${exception.message}\"}"))
                    .setHeader(Exchange.HTTP_RESPONSE_CODE, constant(500))
                    .end();
    }
}
