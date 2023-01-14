package com.smoothieshop.app.service;

import com.smoothieshop.app.model.domain.SmoothieNutrientEntity;

public interface SmoothieNutrientService {

  SmoothieNutrientEntity[] getNutrientsBySmoothieId(Long id);

}
