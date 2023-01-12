package com.shop.smoothie.service;

import com.shop.smoothie.domain.entity.SmoothieNutrientEntity;

public interface SmoothieNutrientService {

  Iterable<SmoothieNutrientEntity> getNutrientsBySmoothieId(Long id);

}
