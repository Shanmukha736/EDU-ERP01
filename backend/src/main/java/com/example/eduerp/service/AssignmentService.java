package com.example.eduerp.service;

import com.example.eduerp.dto.AssignmentRequestDTO;
import com.example.eduerp.dto.AssignmentResponseDTO;
import com.example.eduerp.entity.Assignment;
import com.example.eduerp.exception.ResourceNotFoundException;
import com.example.eduerp.repository.AssignmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    public AssignmentResponseDTO createAssignment(AssignmentRequestDTO dto) {
        Assignment assignment = new Assignment();
        assignment.setTitle(dto.getTitle());
        assignment.setDescription(dto.getDescription());
        assignment.setTeacherId(dto.getTeacherId());
        assignment.setDueDate(dto.getDueDate());
        assignment.setFileUrl(dto.getFileUrl());

        Assignment saved = assignmentRepository.save(assignment);
        return mapToDTO(saved);
    }

    public List<AssignmentResponseDTO> getAllAssignments() {
        return assignmentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public AssignmentResponseDTO getAssignmentById(Long id) {
        Assignment assignment = assignmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Assignment not found with id: " + id));
        return mapToDTO(assignment);
    }

    public List<AssignmentResponseDTO> getAssignmentsByTeacher(Long teacherId) {
        return assignmentRepository.findByTeacherId(teacherId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AssignmentResponseDTO mapToDTO(Assignment assignment) {
        AssignmentResponseDTO dto = new AssignmentResponseDTO();
        dto.setId(assignment.getId());
        dto.setTitle(assignment.getTitle());
        dto.setDescription(assignment.getDescription());
        dto.setTeacherId(assignment.getTeacherId());
        dto.setDueDate(assignment.getDueDate());
        dto.setCreatedAt(assignment.getCreatedAt());
        dto.setFileUrl(assignment.getFileUrl());
        return dto;
    }
}
