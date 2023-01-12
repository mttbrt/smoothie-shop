package com.shop.smoothie.service.impl;

import com.shop.smoothie.domain.entity.SmoothieNutrientEntity;
import com.shop.smoothie.repository.SmoothieNutrientRepository;
import com.shop.smoothie.service.SmoothieNutrientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SmoothieNutrientServiceImpl implements SmoothieNutrientService {

  private final SmoothieNutrientRepository smoothieNutrientRepository;

  public SmoothieNutrientServiceImpl(@Autowired SmoothieNutrientRepository smoothieNutrientRepository) {
    this.smoothieNutrientRepository = smoothieNutrientRepository;
  }

  @Override
  public Iterable<SmoothieNutrientEntity> getNutrientsBySmoothieId(Long id) {
    return smoothieNutrientRepository.findAllBySmoothieId(id);
  }
}
