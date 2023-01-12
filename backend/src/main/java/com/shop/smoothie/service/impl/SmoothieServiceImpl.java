package com.shop.smoothie.service.impl;

import com.shop.smoothie.domain.entity.SmoothieEntity;
import com.shop.smoothie.domain.model.SmoothieDTO;
import com.shop.smoothie.exception.EntityNotFoundException;
import com.shop.smoothie.repository.SmoothieRepository;
import com.shop.smoothie.service.SmoothieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SmoothieServiceImpl implements SmoothieService {

  private final SmoothieRepository smoothieRepository;

  public SmoothieServiceImpl(@Autowired SmoothieRepository smoothieRepository) {
    this.smoothieRepository = smoothieRepository;
  }

  @Override
  public Iterable<SmoothieEntity> getSmoothies() {
    return smoothieRepository.findAll();
  }

  @Override
  public void updateSmoothieById(Long id, SmoothieDTO dto) {
    Optional<SmoothieEntity> entity = smoothieRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No smoothie found with id %d", id));
    }

    SmoothieEntity e = entity.get();
    e.setDtoValues(dto);
    smoothieRepository.save(e);
  }

  @Override
  public void deleteSmoothieById(Long id) {
    if (!smoothieRepository.existsById(id)) {
      throw new EntityNotFoundException(String.format("No smoothie found with id %d", id));
    }

    smoothieRepository.deleteById(id);
  }
}
