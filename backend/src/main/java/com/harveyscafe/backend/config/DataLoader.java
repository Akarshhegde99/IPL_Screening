package com.harveyscafe.backend.config;

import com.harveyscafe.backend.model.MatchSession;
import com.harveyscafe.backend.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private MatchRepository matchRepository;

    @Override
    public void run(String... args) throws Exception {
        matchRepository.deleteAll();
        System.out.println("Loading initial match data...");

        MatchSession match1 = new MatchSession(
                null, "LSG", "RCB", 
                LocalDate.of(2026, 4, 15), LocalTime.of(19, 30), 
                "COMPLETED", "/rcb-poster.jpg"
        );

        MatchSession match2 = new MatchSession(
                null, "RCB", "DC", 
                LocalDate.of(2026, 4, 18), LocalTime.of(15, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );

        MatchSession match3 = new MatchSession(
                null, "RCB", "GT", 
                LocalDate.of(2026, 4, 24), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );

        MatchSession match4 = new MatchSession(
                null, "DC", "RCB", 
                LocalDate.of(2026, 4, 27), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );

        MatchSession match5 = new MatchSession(
                null, "GT", "RCB", 
                LocalDate.of(2026, 4, 30), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );

        MatchSession match6 = new MatchSession(
                null, "LSG", "RCB", 
                LocalDate.of(2026, 5, 7), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );
        
        matchRepository.saveAll(Arrays.asList(match1, match2, match3, match4, match5, match6));
        System.out.println("Initial match data loaded.");
    }
}
