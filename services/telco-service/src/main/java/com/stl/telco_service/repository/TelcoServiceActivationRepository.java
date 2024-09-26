package com.stl.telco_service.repository;

import com.stl.telco_service.model.TelcoServiceActivation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TelcoServiceActivationRepository extends JpaRepository<TelcoServiceActivation, Long> {
    TelcoServiceActivation findByTelcoService_IdAndUsername(Long telcoServiceId, String username);
    List<TelcoServiceActivation> findByUsername(String username);
}
