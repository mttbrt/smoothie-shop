package com.shop.smoothie.service;

import com.shop.smoothie.domain.entity.SmoothieEntity;
import com.shop.smoothie.domain.model.SmoothieDTO;

public interface SmoothieService {

  Iterable<SmoothieEntity> getSmoothies();

  void updateSmoothieById(Long id, SmoothieDTO dto);

  void deleteSmoothieById(Long id);

}
