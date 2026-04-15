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
                null, "CSK", "RCB", 
                LocalDate.of(2026, 4, 5), LocalTime.of(19, 30), 
                "COMPLETED", "/rcb-poster.jpg"
        );

        MatchSession match2 = new MatchSession(
                null, "RCB", "RR", 
                LocalDate.of(2026, 4, 10), LocalTime.of(19, 30), 
                "COMPLETED", "/rcb-poster.jpg"
        );

        MatchSession match3 = new MatchSession(
                null, "RCB", "MI", 
                LocalDate.of(2026, 4, 12), LocalTime.of(19, 30), 
                "COMPLETED", "/rcb-poster.jpg"
        );

        MatchSession match4 = new MatchSession(
                null, "RCB", "LSG", 
                LocalDate.of(2026, 4, 15), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );

        MatchSession match5 = new MatchSession(
                null, "RCB", "KKR", 
                LocalDate.of(2026, 4, 18), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );

        MatchSession match6 = new MatchSession(
                null, "RCB", "SRH", 
                LocalDate.of(2026, 4, 22), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );
        
        MatchSession match7 = new MatchSession(
                null, "RCB", "PBKS", 
                LocalDate.of(2026, 4, 25), LocalTime.of(19, 30), 
                "UPCOMING", "/rcb-poster.jpg"
        );

        matchRepository.saveAll(Arrays.asList(match1, match2, match3, match4, match5, match6, match7));
        System.out.println("Initial match data loaded.");
    }
}
