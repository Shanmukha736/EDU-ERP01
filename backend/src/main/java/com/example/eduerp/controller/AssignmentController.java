package com.example.eduerp.controller;

import com.example.eduerp.dto.AssignmentRequestDTO;
import com.example.eduerp.dto.AssignmentResponseDTO;
import com.example.eduerp.dto.SubmissionResponseDTO;
import com.example.eduerp.service.AssignmentService;
import com.example.eduerp.service.SubmissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class AssignmentController {

    private final AssignmentService assignmentService;
    private final SubmissionService submissionService;

    // Teacher: Create assignment
    @PostMapping
    public ResponseEntity<AssignmentResponseDTO> createAssignment(@Valid @RequestBody AssignmentRequestDTO dto) {
        return ResponseEntity.ok(assignmentService.createAssignment(dto));
    }

    // Teacher: View all assignments created by them
    @GetMapping("/teacher/{teacherId}")
    public ResponseEntity<List<AssignmentResponseDTO>> getAssignmentsByTeacher(@PathVariable Long teacherId) {
        return ResponseEntity.ok(assignmentService.getAssignmentsByTeacher(teacherId));
    }

    // Teacher: View all student submissions for a specific assignment
    @GetMapping("/{assignmentId}/submissions")
    public ResponseEntity<List<SubmissionResponseDTO>> getSubmissionsByAssignment(@PathVariable Long assignmentId) {
        return ResponseEntity.ok(submissionService.getSubmissionsByAssignment(assignmentId));
    }

    // Student: View all available assignments
    @GetMapping
    public ResponseEntity<List<AssignmentResponseDTO>> getAllAssignments() {
        return ResponseEntity.ok(assignmentService.getAllAssignments());
    }

    // Student: View assignment details
    @GetMapping("/{id}")
    public ResponseEntity<AssignmentResponseDTO> getAssignmentById(@PathVariable Long id) {
        return ResponseEntity.ok(assignmentService.getAssignmentById(id));
    }
}
