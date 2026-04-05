package com.harveyscafe.backend.dto;

import lombok.Data;

@Data
public class BookingRequestDTO {
    private String name;
    private String phone;
    private Long matchId;
    private Integer tables;
    private String paymentStatus; // e.g. "PENDING", "PAID"
}
