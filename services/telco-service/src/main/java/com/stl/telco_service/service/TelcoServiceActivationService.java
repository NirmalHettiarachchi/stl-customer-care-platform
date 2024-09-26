package com.stl.telco_service.service;

import com.stl.telco_service.model.TelcoService;
import com.stl.telco_service.model.TelcoServiceActivation;
import com.stl.telco_service.repository.TelcoServiceActivationRepository;
import com.stl.telco_service.repository.TelcoServiceRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TelcoServiceActivationService {

    @Autowired
    private TelcoServiceActivationRepository activationRepository;

    @Autowired
    private TelcoServiceRepository telcoServiceRepository;

    public TelcoServiceActivation activateTelcoService(Long telcoServiceId, String username) {
        TelcoService telcoService = telcoServiceRepository.findById(telcoServiceId)
                .orElseThrow(() -> new EntityNotFoundException("TelcoService not found with id " + telcoServiceId));

        TelcoServiceActivation activation = new TelcoServiceActivation();
        activation.setTelcoService(telcoService);
        activation.setUsername(username);
        activation.setTimeStamp(LocalDateTime.now());

        return activationRepository.save(activation);
    }

    public void deactivateTelcoService(Long telcoServiceId, String username) {
        TelcoServiceActivation activation = activationRepository.findByTelcoService_IdAndUsername(telcoServiceId, username);
        if (activation != null) {
            activationRepository.delete(activation);
        } else {
            throw new EntityNotFoundException("No activation found for TelcoService with id " + telcoServiceId + " and username " + username);
        }
    }

    public List<TelcoServiceActivation> getActivatedServicesForUser(String username) {
        return activationRepository.findByUsername(username);
    }
}
