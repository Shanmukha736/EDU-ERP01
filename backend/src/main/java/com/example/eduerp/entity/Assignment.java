package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "assignments")
@Data
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private String fileUrl; // Changed from attachmentUrl to fileUrl to match requirement
    private Long teacherId; // This is createdBy (teacher)
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime dueDate; // Changed from LocalDate to LocalDateTime for better precision
}
