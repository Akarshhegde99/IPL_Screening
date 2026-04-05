package com.harveyscafe.backend.controller;

import com.harveyscafe.backend.dto.BookingRequestDTO;
import com.harveyscafe.backend.model.Booking;
import com.harveyscafe.backend.model.MatchSession;
import com.harveyscafe.backend.repository.BookingRepository;
import com.harveyscafe.backend.repository.MatchRepository;
import com.harveyscafe.backend.service.BookingService;
import com.harveyscafe.backend.service.StripeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AppController {

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private StripeService stripeService;

    @GetMapping("/matches")
    public List<MatchSession> getUpcomingMatches() {
        return matchRepository.findByStatus("UPCOMING");
    }

    @PostMapping("/bookings/create")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequestDTO request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.ok(booking);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<?> getBooking(@PathVariable String id) {
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isPresent()) {
            return ResponseEntity.ok(booking.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/payment/create-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@RequestBody Map<String, Object> body) {
        Double amount = Double.parseDouble(body.get("amount").toString());
        Map<String, String> result = stripeService.createPaymentIntent(amount);
        return ResponseEntity.ok(result);
    }
}
