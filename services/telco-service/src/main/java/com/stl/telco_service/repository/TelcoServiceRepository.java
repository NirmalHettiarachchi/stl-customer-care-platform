package com.stl.telco_service.repository;

import com.stl.telco_service.model.TelcoService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TelcoServiceRepository extends JpaRepository<TelcoService, Long> {
}
