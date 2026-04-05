package com.harveyscafe.backend.repository;

import com.harveyscafe.backend.model.MatchSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchRepository extends JpaRepository<MatchSession, Long> {
    List<MatchSession> findByStatus(String status);
}
