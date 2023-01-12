package com.shop.smoothie.repository;

import com.shop.smoothie.domain.entity.SmoothieEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmoothieRepository extends CrudRepository<SmoothieEntity, Long> {
}
