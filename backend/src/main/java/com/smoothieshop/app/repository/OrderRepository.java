package com.smoothieshop.app.repository;

import com.smoothieshop.app.model.domain.OrderEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends CrudRepository<OrderEntity, Long> {

}
