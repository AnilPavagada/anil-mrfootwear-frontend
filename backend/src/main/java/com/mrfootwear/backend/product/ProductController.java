package com.mrfootwear.backend.product;

import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> getAll(@RequestParam(required = false) String category,
                                @RequestParam(required = false) String search) {
        String normalizedCategory = category == null ? "" : category.trim();
        String normalizedSearch = search == null ? "" : search.trim().toLowerCase();
        return repository.findAll().stream()
            .filter(product -> normalizedCategory.isEmpty()
                || "All Collections".equalsIgnoreCase(normalizedCategory)
                || product.getCategory().equalsIgnoreCase(normalizedCategory))
            .filter(product -> normalizedSearch.isEmpty()
                || product.getName().toLowerCase().contains(normalizedSearch)
                || product.getSku().toLowerCase().contains(normalizedSearch)
                || product.getCategory().toLowerCase().contains(normalizedSearch))
            .toList();
    }

    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Product not found."));
    }

    @PostMapping
    public ResponseEntity<Product> create(@Valid @RequestBody ProductRequest request) {
        if (repository.existsBySkuIgnoreCase(request.sku().trim())) {
            throw new IllegalArgumentException("A product with this SKU already exists.");
        }
        Product product = new Product(request.name().trim(), request.sku().trim(),
            request.category().trim(), request.price(), request.stock(),
            request.description(), null);
        product = repository.save(product);
        return ResponseEntity.created(URI.create("/api/products/" + product.getId())).body(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        Product product = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Product not found."));
        if (!product.getSku().equalsIgnoreCase(request.sku().trim())
            && repository.existsBySkuIgnoreCase(request.sku().trim())) {
            throw new IllegalArgumentException("A product with this SKU already exists.");
        }
        product.setName(request.name().trim());
        product.setSku(request.sku().trim());
        product.setCategory(request.category().trim());
        product.setPrice(request.price());
        product.setStock(request.stock());
        product.setDescription(request.description());
        return repository.save(product);
    }

    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Product uploadImage(@PathVariable Long id,
                               @RequestParam("file") MultipartFile file) throws Exception {
        Product product = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Product not found."));
        if (file.isEmpty() || file.getContentType() == null
            || !file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Choose a valid image file.");
        }
        product.setImage(file.getBytes());
        product.setImageName(file.getOriginalFilename());
        product.setImageType(file.getContentType());
        return repository.save(product);
    }

    @GetMapping(value = "/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Product product = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Product not found."));
        if (product.getImage() == null) return ResponseEntity.notFound().build();
        MediaType mediaType = product.getImageType() == null
            ? MediaType.APPLICATION_OCTET_STREAM
            : MediaType.parseMediaType(product.getImageType());
        return ResponseEntity.ok().contentType(mediaType).body(product.getImage());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Product not found.");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
