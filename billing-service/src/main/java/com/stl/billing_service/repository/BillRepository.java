package com.stl.billing_service.repository;

import com.stl.billing_service.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByUsername(String username);
}
