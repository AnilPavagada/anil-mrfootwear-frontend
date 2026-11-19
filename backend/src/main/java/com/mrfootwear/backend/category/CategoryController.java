package com.mrfootwear.backend.category;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Category> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public ResponseEntity<Category> create(@Valid @RequestBody CategoryRequest request) {
        if (repository.existsByNameIgnoreCase(request.name().trim())) {
            throw new IllegalArgumentException("A category with this name already exists.");
        }
        Category category = repository.save(new Category(request.name().trim()));
        return ResponseEntity.created(URI.create("/api/categories/" + category.getId())).body(category);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        Category category = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Category not found."));
        if (!category.getName().equalsIgnoreCase(request.name().trim())
            && repository.existsByNameIgnoreCase(request.name().trim())) {
            throw new IllegalArgumentException("A category with this name already exists.");
        }
        category.setName(request.name().trim());
        return repository.save(category);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Category not found.");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
