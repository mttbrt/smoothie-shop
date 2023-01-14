package com.smoothieshop.app.repository;

import com.smoothieshop.app.model.domain.OrderSmoothieEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderSmoothieRepository extends CrudRepository<OrderSmoothieEntity, Long> {

}
