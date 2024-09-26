package com.stl.telco_service.controller;

import com.stl.telco_service.model.TelcoService;
import com.stl.telco_service.service.TelcoServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/telco-services")
public class TelcoServiceController {

    @Autowired
    private TelcoServiceService telcoServiceService;

    @PostMapping("/create")
    public TelcoService createTelcoService(@RequestParam String serviceName, @RequestParam BigDecimal price) {
        return telcoServiceService.createTelcoService(serviceName, price);
    }

    @GetMapping("")
    public List<TelcoService> getTelcoServices() {
        return telcoServiceService.getTelcoServices();
    }
}
