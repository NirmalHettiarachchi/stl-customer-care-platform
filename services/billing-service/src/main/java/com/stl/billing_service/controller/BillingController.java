package com.stl.billing_service.controller;

import com.stl.billing_service.model.Bill;
import com.stl.billing_service.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/bills")
public class BillingController {

    @Autowired
    private BillingService billingService;

    @GetMapping
    public List<Bill> getUserBills() {
        String username = getCurrentUsername();
        return billingService.getBillsForUser(username);
    }

    @PostMapping("/pay/{billId}")
    public Bill payBill(@PathVariable Long billId, @RequestHeader("Authorization") String token) {
        return billingService.payBill(billId, token);
    }

    @PostMapping("/create")
    public Bill createBill(@RequestParam BigDecimal amount, @RequestParam LocalDateTime dueDate) {
        String username = getCurrentUsername();
        return billingService.createBillForUser(username, amount, dueDate);
    }

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }
}
