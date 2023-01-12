package com.shop.smoothie.repository;

import com.shop.smoothie.domain.entity.OrderSmoothieEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderSmoothieRepository extends CrudRepository<OrderSmoothieEntity, Long> {
}
