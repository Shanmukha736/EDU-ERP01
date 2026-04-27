package com.example.eduerp.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;

@Data
public class SubmissionRequestDTO {
    @NotNull(message = "Assignment ID is required")
    private Long assignmentId;

    @NotNull(message = "Student ID is required")
    private Long studentId;

    private String fileUrl;
}
