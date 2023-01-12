package com.shop.smoothie.repository;

import com.shop.smoothie.domain.entity.SmoothieNutrientEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SmoothieNutrientRepository extends CrudRepository<SmoothieNutrientEntity, Long> {

  List<SmoothieNutrientEntity> findAllBySmoothieId(Long smoothieId);

}
