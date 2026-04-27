package com.example.eduerp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SubmissionResponseDTO {
    private Long id;
    private Long assignmentId;
    private Long studentId;
    private String studentName;
    private String fileUrl;
    private LocalDateTime submittedAt;
    private Double grade;
    private String feedback;
    private String status;
}
