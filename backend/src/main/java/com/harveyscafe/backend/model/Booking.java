package com.harveyscafe.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id; // Use UUID for random receipt strings

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "match_id", nullable = false)
    private MatchSession matchSession;

    @Column(nullable = false)
    private Integer tables;

    @Column(nullable = false)
    private Double totalPrice;

    @Column(nullable = false)
    private String paymentStatus; // PENDING, PAID, FAILED

    @Column(nullable = false)
    private String status; // BOOKED, CHECKED_IN, CANCELLED

    @Column(columnDefinition = "TEXT")
    private String qrCodeData;

    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
