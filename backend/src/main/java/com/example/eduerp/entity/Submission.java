package com.example.eduerp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "submissions")
@Data
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assignmentId;
    private Long studentId;
    
    private String fileUrl;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime submittedAt;
    
    private Double grade;
    private String feedback;
    private String status; // PENDING, SUBMITTED, GRADED
}
