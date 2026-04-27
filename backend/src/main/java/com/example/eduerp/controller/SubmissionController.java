package com.example.eduerp.controller;

import com.example.eduerp.dto.GradeRequestDTO;
import com.example.eduerp.dto.SubmissionRequestDTO;
import com.example.eduerp.dto.SubmissionResponseDTO;
import com.example.eduerp.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    // Student: Upload submission
    @PostMapping
    public ResponseEntity<SubmissionResponseDTO> submitAssignment(@Valid @RequestBody SubmissionRequestDTO dto) {
        return ResponseEntity.ok(submissionService.submitAssignment(dto));
    }

    // Student: View their submitted assignments
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<SubmissionResponseDTO>> getSubmissionsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByStudent(studentId));
    }

    // Teacher: Grade submissions
    @PutMapping("/{submissionId}/grade")
    public ResponseEntity<SubmissionResponseDTO> gradeSubmission(
            @PathVariable Long submissionId, 
            @Valid @RequestBody GradeRequestDTO dto) {
        return ResponseEntity.ok(submissionService.gradeSubmission(submissionId, dto));
    }
}
