package com.mrfootwear.backend.config;

import com.mrfootwear.backend.category.CategoryRepository;
import com.mrfootwear.backend.category.Category;
import com.mrfootwear.backend.product.Product;
import com.mrfootwear.backend.product.ProductRepository;
import com.mrfootwear.backend.review.Review;
import com.mrfootwear.backend.review.ReviewRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedData(CategoryRepository categories, ProductRepository products,
                               ReviewRepository reviews) {
        return args -> {
            if (categories.count() == 0) {
                for (String name : List.of(
                    "All Collections",
                    "Men's Shoes / Slippers",
                    "Women's Shoes / Slippers",
                    "Sports Shoes / Slippers",
                    "Kids Shoes / Slippers",
                    "School Shoes / Slippers",
                    "Casual & Formal")) {
                    categories.save(new Category(name));
                }
            }

            if (products.count() == 0) {
                products.save(new Product(
                    "Air Flex Runner", "MR-AFR-001", "Sports Shoes / Slippers",
                    2499, 18, "Lightweight everyday running shoes.", null));
                products.save(new Product(
                    "Classic Leather Formal", "MR-CLF-002", "Casual & Formal",
                    3199, 7, "A clean, comfortable formal style.", null));
                products.save(new Product(
                    "Everyday Comfort Sandal", "MR-ECS-003", "Casual & Formal",
                    899, 0, "An easy slip-on sandal for daily wear.", null));
            }

            if (reviews.count() == 0) {
                reviews.save(new Review("Ravi Kumar",
                    "Excellent quality! Very comfortable for everyday use.",
                    5, "APPROVED", Instant.parse("2026-11-18T10:30:00Z")));
                reviews.save(new Review("Anitha S",
                    "Very comfortable shoes and helpful service.",
                    4, "PENDING", Instant.parse("2026-11-17T09:15:00Z")));
                reviews.save(new Review("Suresh K",
                    "Good selection and a friendly store team.",
                    5, "APPROVED", Instant.parse("2026-11-16T13:45:00Z")));
            }
        };
    }
}
