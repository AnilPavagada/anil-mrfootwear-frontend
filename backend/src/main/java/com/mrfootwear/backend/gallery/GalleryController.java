package com.mrfootwear.backend.gallery;

import java.net.URI;
import java.util.List;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/gallery")
public class GalleryController {
    private final GalleryRepository repository;

    public GalleryController(GalleryRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<GalleryItem> getAll() {
        return repository.findAll();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<GalleryItem> upload(
        @RequestParam("file") MultipartFile file,
        @RequestParam(required = false, defaultValue = "") String caption
    ) throws Exception {
        if (file.isEmpty() || file.getContentType() == null
            || !file.getContentType().startsWith("image/")) {
            throw new IllegalArgumentException("Choose a valid image file.");
        }
        GalleryItem item = new GalleryItem();
        item.setCaption(caption.trim());
        item.setImage(file.getBytes());
        item.setImageName(file.getOriginalFilename());
        item.setImageType(file.getContentType());
        item = repository.save(item);
        return ResponseEntity.created(URI.create("/api/gallery/" + item.getId())).body(item);
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        GalleryItem item = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Gallery image not found."));
        if (item.getImage() == null) return ResponseEntity.notFound().build();
        MediaType mediaType = item.getImageType() == null
            ? MediaType.APPLICATION_OCTET_STREAM
            : MediaType.parseMediaType(item.getImageType());
        return ResponseEntity.ok().contentType(mediaType).body(item.getImage());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("Gallery image not found.");
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
