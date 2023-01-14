package com.smoothieshop.app.service.impl;

import com.google.common.collect.Iterables;
import com.smoothieshop.app.model.domain.SmoothieEntity;
import com.smoothieshop.app.model.domain.SmoothieNutrientEntity;
import com.smoothieshop.app.repository.SmoothieNutrientRepository;
import com.smoothieshop.app.service.SmoothieNutrientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmoothieNutrientServiceImpl implements SmoothieNutrientService {

  private final SmoothieNutrientRepository smoothieNutrientRepository;

  public SmoothieNutrientServiceImpl(
      @Autowired SmoothieNutrientRepository smoothieNutrientRepository) {
    this.smoothieNutrientRepository = smoothieNutrientRepository;
  }

  @Override
  public SmoothieNutrientEntity[] getNutrientsBySmoothieId(Long id) {
    return Iterables.toArray(smoothieNutrientRepository.findAllBySmoothieId(id), SmoothieNutrientEntity.class);
  }
}
