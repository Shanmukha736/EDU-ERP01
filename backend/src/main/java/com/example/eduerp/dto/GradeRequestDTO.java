package com.example.eduerp.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

@Data
public class GradeRequestDTO {
    @NotNull(message = "Grade is required")
    @Min(value = 0, message = "Grade must be at least 0")
    @Max(value = 100, message = "Grade cannot exceed 100")
    private Double grade;

    private String feedback;
}
