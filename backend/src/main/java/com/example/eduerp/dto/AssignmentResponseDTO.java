package com.example.eduerp.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class AssignmentResponseDTO {
    private Long id;
    private String title;
    private String description;
    private String fileUrl;
    private Long teacherId;
    private LocalDateTime createdAt;
    private LocalDateTime dueDate;
}
