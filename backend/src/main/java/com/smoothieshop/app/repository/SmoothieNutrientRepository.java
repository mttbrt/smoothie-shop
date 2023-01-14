package com.smoothieshop.app.repository;

import com.smoothieshop.app.model.domain.SmoothieNutrientEntity;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmoothieNutrientRepository extends CrudRepository<SmoothieNutrientEntity, Long> {

  List<SmoothieNutrientEntity> findAllBySmoothieId(Long smoothieId);

}
