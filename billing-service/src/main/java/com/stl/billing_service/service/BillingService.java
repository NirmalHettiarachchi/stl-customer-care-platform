package com.stl.billing_service.service;

import com.stl.billing_service.model.Bill;
import com.stl.billing_service.repository.BillRepository;
import org.apache.camel.ProducerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private ProducerTemplate producerTemplate;

    public List<Bill> getBillsForUser(String username) {
        return billRepository.findByUsername(username);
    }

    public Bill payBill(Long billId, String token) {
        Bill bill = billRepository.findById(billId).orElseThrow(() -> new RuntimeException("Bill not found"));
        bill.setPaid(true);
        Bill updatedBill = billRepository.save(bill);

        Map<String, Object> headers = new HashMap<>();
        headers.put("Authorization", token);

        producerTemplate.sendBodyAndHeaders("direct:sendNotification", updatedBill, headers);

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
