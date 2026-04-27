package com.example.eduerp.service;

import com.example.eduerp.dto.GradeRequestDTO;
import com.example.eduerp.dto.SubmissionRequestDTO;
import com.example.eduerp.dto.SubmissionResponseDTO;
import com.example.eduerp.entity.Submission;
import com.example.eduerp.entity.User;
import com.example.eduerp.exception.ResourceNotFoundException;
import com.example.eduerp.repository.SubmissionRepository;
import com.example.eduerp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final UserRepository userRepository;

    public SubmissionResponseDTO submitAssignment(SubmissionRequestDTO dto) {
        // Check if student has already submitted for this assignment
        Optional<Submission> existing = submissionRepository.findByAssignmentIdAndStudentId(
                dto.getAssignmentId(), dto.getStudentId());

        Submission submission;
        if (existing.isPresent()) {
            // Update logic (Allow resubmission)
            submission = existing.get();
            submission.setFileUrl(dto.getFileUrl());
            // submittedAt will be handled by @UpdateTimestamp if we had one, 
            // but for simplicity we keep the original or update it manually.
            // Requirement says "Add timestamps automatically" - @CreationTimestamp is on entity.
        } else {
            submission = new Submission();
            submission.setAssignmentId(dto.getAssignmentId());
            submission.setStudentId(dto.getStudentId());
            submission.setFileUrl(dto.getFileUrl());
            submission.setStatus("SUBMITTED");
        }

        Submission saved = submissionRepository.save(submission);
        return mapToDTO(saved);
    }

    public List<SubmissionResponseDTO> getSubmissionsByAssignment(Long assignmentId) {
        return submissionRepository.findByAssignmentId(assignmentId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public List<SubmissionResponseDTO> getSubmissionsByStudent(Long studentId) {
        return submissionRepository.findByStudentId(studentId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public SubmissionResponseDTO gradeSubmission(Long submissionId, GradeRequestDTO dto) {
        Submission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new ResourceNotFoundException("Submission not found with id: " + submissionId));
        
        submission.setGrade(dto.getGrade());
        submission.setFeedback(dto.getFeedback());
        submission.setStatus("GRADED");
        
        Submission saved = submissionRepository.save(submission);
        return mapToDTO(saved);
    }

    private SubmissionResponseDTO mapToDTO(Submission submission) {
        SubmissionResponseDTO dto = new SubmissionResponseDTO();
        dto.setId(submission.getId());
        dto.setAssignmentId(submission.getAssignmentId());
        dto.setStudentId(submission.getStudentId());
        dto.setFileUrl(submission.getFileUrl());
        dto.setSubmittedAt(submission.getSubmittedAt());
        dto.setGrade(submission.getGrade());
        dto.setFeedback(submission.getFeedback());
        dto.setStatus(submission.getStatus());
        
        userRepository.findById(submission.getStudentId()).ifPresent(user -> {
            dto.setStudentName(user.getName());
        });
        
        return dto;
    }
}
