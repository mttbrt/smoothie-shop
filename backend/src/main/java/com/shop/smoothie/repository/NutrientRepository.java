package com.shop.smoothie.repository;

import com.shop.smoothie.domain.entity.NutrientEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NutrientRepository extends CrudRepository<NutrientEntity, Long> {
}
