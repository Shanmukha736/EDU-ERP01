package com.example.eduerp.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;
import java.time.LocalDateTime;

@Data
public class AssignmentRequestDTO {
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Teacher ID is required")
    private Long teacherId;

    @NotNull(message = "Due date is required")
    @Future(message = "Due date must be in the future")
    private LocalDateTime dueDate;

    private String fileUrl;
}
