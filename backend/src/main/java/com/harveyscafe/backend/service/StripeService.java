package com.harveyscafe.backend.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Value("${stripe.api.key}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public Map<String, String> createPaymentIntent(Double amount) {
        Map<String, String> response = new HashMap<>();
        try {
            if (stripeApiKey == null || stripeApiKey.equals("sk_test_replace_with_real_key_or_leave_mocked")) {
                // Return dummy intent
                response.put("clientSecret", "dummy_secret_for_bypass");
                return response;
            }

            PaymentIntentCreateParams params =
                    PaymentIntentCreateParams.builder()
                            .setAmount((long) (amount * 100))
                            .setCurrency("inr")
                            .build();

            PaymentIntent intent = PaymentIntent.create(params);
            response.put("clientSecret", intent.getClientSecret());

        } catch (StripeException e) {
            e.printStackTrace();
            response.put("error", e.getMessage());
            // Graceful fallback: Still allow them to continue
            response.put("clientSecret", "fallback_dummy_secret");
        }
        return response;
    }
}
