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
        if (matchRepository.count() == 0) {
            System.out.println("Loading initial match data...");

            MatchSession match1 = new MatchSession(
                    null, "RCB", "CSK", 
                    LocalDate.now().plusDays(2), LocalTime.of(19, 30), 
                    "UPCOMING", "https://fakeimg.pl/600x400/990000/fff/?text=RCB+vs+CSK+Poster+Template"
            );

            MatchSession match2 = new MatchSession(
                    null, "RCB", "MI", 
                    LocalDate.now().plusDays(5), LocalTime.of(19, 30), 
                    "UPCOMING", "https://fakeimg.pl/600x400/000000/fff/?text=RCB+vs+MI+Poster+Template"
            );

            MatchSession match3 = new MatchSession(
                    null, "RCB", "GT", 
                    LocalDate.now().plusDays(9), LocalTime.of(15, 30), 
                    "UPCOMING", "https://fakeimg.pl/600x400/990000/fff/?text=RCB+vs+GT+Poster+Template"
            );

            MatchSession match4 = new MatchSession(
                    null, "Coming Soon", "TBD", 
                    LocalDate.now().plusDays(15), LocalTime.of(19, 30), 
                    "UPCOMING", "https://fakeimg.pl/600x400/222222/fff/?text=Coming+Soon"
            );

            matchRepository.saveAll(Arrays.asList(match1, match2, match3, match4));
            System.out.println("Initial match data loaded.");
        }
    }
}
