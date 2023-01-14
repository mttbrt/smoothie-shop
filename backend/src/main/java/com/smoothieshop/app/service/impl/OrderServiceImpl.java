package com.smoothieshop.app.service.impl;

import com.smoothieshop.app.exception.EntityNotFoundException;
import com.smoothieshop.app.model.domain.OrderEntity;
import com.smoothieshop.app.model.domain.OrderSmoothieEntity;
import com.smoothieshop.app.model.domain.SmoothieEntity;
import com.smoothieshop.app.model.domain.UserEntity;
import com.smoothieshop.app.model.dto.OrderDTO;
import com.smoothieshop.app.model.dto.OrderSmoothieDTO;
import com.smoothieshop.app.repository.OrderRepository;
import com.smoothieshop.app.repository.OrderSmoothieRepository;
import com.smoothieshop.app.repository.SmoothieRepository;
import com.smoothieshop.app.repository.UserRepository;
import com.smoothieshop.app.service.OrderService;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderServiceImpl implements OrderService {

  private final OrderRepository orderRepository;
  private final OrderSmoothieRepository orderSmoothieRepository;
  private final SmoothieRepository smoothieRepository;
  private final UserRepository userRepository;

  public OrderServiceImpl(@Autowired OrderRepository orderRepository,
      @Autowired OrderSmoothieRepository orderSmoothieRepository,
      @Autowired SmoothieRepository smoothieRepository,
      @Autowired UserRepository userRepository) {
    this.orderRepository = orderRepository;
    this.orderSmoothieRepository = orderSmoothieRepository;
    this.smoothieRepository = smoothieRepository;
    this.userRepository = userRepository;
  }

  @Override
  @Transactional
  public void createOrder(OrderDTO dto, String createdByUsername) {
    Optional<UserEntity> createdBy = userRepository.findByUsername(createdByUsername);
    if (createdBy.isEmpty()) {
      throw new EntityNotFoundException(
          String.format("No user found with username %s", createdByUsername));
    }

    OrderEntity order = new OrderEntity();
    order.setCreatedBy(createdBy.get());
    OrderEntity savedOrder = orderRepository.save(order);

    List<OrderSmoothieEntity> entities = new LinkedList<>();
    for (OrderSmoothieDTO orderSmoothie : dto.getSmoothies()) {
      Optional<SmoothieEntity> smoothie = smoothieRepository.findById(
          orderSmoothie.getSmoothieId());
      if (smoothie.isEmpty()) {
        throw new EntityNotFoundException(
            String.format("No smoothie found with id %d", orderSmoothie.getSmoothieId()));
      }

      OrderSmoothieEntity osEntity = new OrderSmoothieEntity();
      osEntity.setOrder(savedOrder);
      osEntity.setSmoothie(smoothie.get());
      osEntity.setQuantity(orderSmoothie.getQuantity());

      entities.add(osEntity);
    }

    orderSmoothieRepository.saveAll(entities);
  }

}
