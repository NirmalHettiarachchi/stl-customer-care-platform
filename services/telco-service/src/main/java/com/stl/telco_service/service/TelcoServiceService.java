package com.stl.telco_service.service;

import com.stl.telco_service.model.TelcoService;
import com.stl.telco_service.repository.TelcoServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TelcoServiceService {

    @Autowired
    private TelcoServiceRepository telcoServiceRepository;

    public TelcoService createTelcoService(String telcoServiceName, BigDecimal price) {
        TelcoService telcoService = new TelcoService();
        telcoService.setServiceName(telcoServiceName);
        telcoService.setPrice(price);
        return telcoServiceRepository.save(telcoService);
    }

    public List<TelcoService> getTelcoServices() {
        return telcoServiceRepository.findAll();
    }
}
