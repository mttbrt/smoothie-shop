package com.smoothieshop.app.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import com.smoothieshop.app.exception.EntityNotFoundException;
import com.smoothieshop.app.model.domain.SmoothieEntity;
import com.smoothieshop.app.model.dto.SmoothieDTO;
import com.smoothieshop.app.repository.SmoothieRepository;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class SmoothieServiceImplTest {

  @InjectMocks
  private SmoothieServiceImpl service;

  @Mock
  private SmoothieRepository smoothieRepository;

  @Test
  void getSmoothieByIdOk() {
    SmoothieEntity smoothie = new SmoothieEntity(1L, "test", 0.0F);
    when(smoothieRepository.findById(1L)).thenReturn(Optional.of(smoothie));

    // Test
    SmoothieEntity res = service.getSmoothieById(1L);

    // Verify
    assertEquals(smoothie, res);
  }

  @Test
  void getSmoothieByIdNotFoundEx() {
    SmoothieEntity smoothie = new SmoothieEntity(1L, "test", 0.0F);
    when(smoothieRepository.findById(1L)).thenReturn(Optional.empty());

    // Test
    Exception exception = assertThrows(
        EntityNotFoundException.class, () -> service.getSmoothieById(1L));

    // Verify
    assertEquals("No smoothie found with id 1", exception.getMessage());
  }

  @Test
  void updateSmoothieByIdOk() {
    SmoothieDTO smoothie = new SmoothieDTO("test", 0.0F);
    when(smoothieRepository.findById(1L)).thenReturn(Optional.of(new SmoothieEntity()));

    // Test
    service.updateSmoothieById(1L, smoothie);
  }

  @Test
  void updateSmoothieByIdNotFoundEx() {
    SmoothieDTO smoothie = new SmoothieDTO("test", 0.0F);
    when(smoothieRepository.findById(1L)).thenReturn(Optional.empty());

    // Test
    Exception exception = assertThrows(
        EntityNotFoundException.class, () -> service.updateSmoothieById(1L, smoothie));

    // Verify
    assertEquals("No smoothie found with id 1", exception.getMessage());
  }

  @Test
  void deleteSmoothieByIdOk() {
    when(smoothieRepository.existsById(1L)).thenReturn(true);

    // Test
    service.deleteSmoothieById(1L);
  }

  @Test
  void deleteSmoothieByIdNotFoundEx() {
    when(smoothieRepository.existsById(1L)).thenReturn(false);

    // Test
    Exception exception = assertThrows(
        EntityNotFoundException.class, () -> service.deleteSmoothieById(1L));

    // Verify
    assertEquals("No smoothie found with id 1", exception.getMessage());
  }

}