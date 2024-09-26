package com.stl.telco_service.controller;

import com.stl.telco_service.model.TelcoServiceActivation;
import com.stl.telco_service.service.TelcoServiceActivationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/telco-service-activations")
@CrossOrigin(origins = "*")
public class TelcoServiceActivationController {

    @Autowired
    private TelcoServiceActivationService activationService;

    @PostMapping("/activate")
    public TelcoServiceActivation activateTelcoService(@RequestParam Long telcoServiceId) {
        String username = getCurrentUsername();
        return activationService.activateTelcoService(telcoServiceId, username);
    }

    @DeleteMapping("/deactivate")
    public ResponseEntity<String> deactivateTelcoService(@RequestParam Long telcoServiceId) {
        String username = getCurrentUsername();
        activationService.deactivateTelcoService(telcoServiceId, username);
        return ResponseEntity.ok("TelcoService with id " + telcoServiceId + " has been deactivated.");
    }

    private String getCurrentUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if(principal instanceof UserDetails) {
            return ((UserDetails) principal).getUsername();
        } else {
            return principal.toString();
        }
    }

    @GetMapping
    public List<TelcoServiceActivation> getUserBills() {
        String username = getCurrentUsername();
        return activationService.getActivatedServicesForUser(username);
    }
}