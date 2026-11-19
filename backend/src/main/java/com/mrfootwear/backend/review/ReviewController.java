package com.mrfootwear.backend.review;

import jakarta.validation.Valid;
import java.net.URI;
import java.time.Instant;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
    private final ReviewRepository repository;

    public ReviewController(ReviewRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Review> getReviews(@RequestParam(defaultValue = "false") boolean approvedOnly) {
        return repository.findAll().stream()
            .filter(review -> !approvedOnly || "APPROVED".equals(review.getStatus()))
            .toList();
    }

    @PostMapping
    public ResponseEntity<Review> create(@Valid @RequestBody ReviewRequest request) {
        Review review = new Review(request.name().trim(), request.feedback().trim(),
            request.rating(), "PENDING", Instant.now());
        review = repository.save(review);
        return ResponseEntity.created(URI.create("/api/reviews/" + review.getId())).body(review);
    }

    @PutMapping("/{id}/status")
    public Review updateStatus(@PathVariable Long id, @RequestParam String status) {
        String normalizedStatus = status == null ? "" : status.trim().toUpperCase();
        if (!List.of("PENDING", "APPROVED", "REJECTED").contains(normalizedStatus)) {
            throw new IllegalArgumentException("Status must be PENDING, APPROVED, or REJECTED.");
        }
        Review review = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Review not found."));
        review.setStatus(normalizedStatus);
        return repository.save(review);
    }
}
