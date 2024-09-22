package com.stl.billing_service.service;

import com.stl.billing_service.model.Bill;
import com.stl.billing_service.repository.BillRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BillingService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<Bill> getBillsForUser(String username) {
        return billRepository.findByUsername(username);
    }

    public Bill payBill(Long billId, String token) {
        Bill bill = billRepository.findById(billId).orElseThrow(() -> new RuntimeException("Bill not found"));
        bill.setPaid(true);
        Bill updatedBill = billRepository.save(bill);

        Map<String, Object> billData = new HashMap<>();
        billData.put("username", updatedBill.getUsername());
        billData.put("amount", updatedBill.getAmount());
        billData.put("paid", updatedBill.isPaid());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        System.out.println("Authorization token: " + token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(billData, headers);

        try {
            restTemplate.postForEntity("http://localhost:8084/processNotification", request, void.class);
        } catch (HttpClientErrorException e) {
            System.err.println("Error response received: " + e.getStatusCode() + " - " + e.getResponseBodyAsString());
            throw e;
        }

        return updatedBill;
    }

    public Bill createBillForUser(String username, BigDecimal amount, LocalDateTime dueDate) {
        Bill bill = new Bill();
        bill.setUsername(username);
        bill.setAmount(amount);
        bill.setDueDate(dueDate);
        bill.setPaid(false);
        return billRepository.save(bill);
    }
}
