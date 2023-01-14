package com.smoothieshop.app.service;

import com.smoothieshop.app.model.domain.SmoothieEntity;
import com.smoothieshop.app.model.dto.SmoothieDTO;

public interface SmoothieService {

  SmoothieEntity[] getSmoothies();

  SmoothieEntity getSmoothieById(Long id);

  void updateSmoothieById(Long id, SmoothieDTO dto);

  void deleteSmoothieById(Long id);

}
