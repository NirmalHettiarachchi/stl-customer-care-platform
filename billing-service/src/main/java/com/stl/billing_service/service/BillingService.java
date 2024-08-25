package com.stl.billing_service.service;

import com.stl.billing_service.model.Bill;
import com.stl.billing_service.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillRepository billRepository;

    public List<Bill> getBillsForUser(String username) {
        return billRepository.findByUsername(username);
    }

    public Bill payBill(Long billId) {
        Bill bill = billRepository.findById(billId).orElseThrow(() -> new RuntimeException("Bill not found"));
        bill.setPaid(true);
        return billRepository.save(bill);
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
