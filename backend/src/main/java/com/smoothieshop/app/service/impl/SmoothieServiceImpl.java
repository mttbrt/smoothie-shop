package com.smoothieshop.app.service.impl;

import com.google.common.collect.Iterables;
import com.smoothieshop.app.exception.EntityNotFoundException;
import com.smoothieshop.app.model.domain.SmoothieEntity;
import com.smoothieshop.app.model.dto.SmoothieDTO;
import com.smoothieshop.app.repository.SmoothieRepository;
import com.smoothieshop.app.service.SmoothieService;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class SmoothieServiceImpl implements SmoothieService {

  private final SmoothieRepository smoothieRepository;

  public SmoothieServiceImpl(@Autowired SmoothieRepository smoothieRepository) {
    this.smoothieRepository = smoothieRepository;
  }

  @Override
  public SmoothieEntity[] getSmoothies() {
    return Iterables.toArray(smoothieRepository.findAll(), SmoothieEntity.class);
  }

  @Override
  public SmoothieEntity getSmoothieById(Long id) {
    Optional<SmoothieEntity> entity = smoothieRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No smoothie found with id %d", id));
    }

    return entity.get();
  }

  @Override
  public void updateSmoothieById(Long id, SmoothieDTO dto) {
    Optional<SmoothieEntity> entity = smoothieRepository.findById(id);
    if (entity.isEmpty()) {
      throw new EntityNotFoundException(String.format("No smoothie found with id %d", id));
    }

    SmoothieEntity e = entity.get();
    e.updateValues(dto);
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
