package com.smoothieshop.app.repository;

import com.smoothieshop.app.model.domain.SmoothieEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SmoothieRepository extends CrudRepository<SmoothieEntity, Long> {

}
