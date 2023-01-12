package com.shop.smoothie.service.impl;

import com.shop.smoothie.domain.entity.OrderEntity;
import com.shop.smoothie.domain.entity.OrderSmoothieEntity;
import com.shop.smoothie.domain.entity.SmoothieEntity;
import com.shop.smoothie.domain.entity.UserEntity;
import com.shop.smoothie.domain.model.OrderDTO;
import com.shop.smoothie.domain.model.OrderSmoothieDTO;
import com.shop.smoothie.exception.EntityNotFoundException;
import com.shop.smoothie.repository.OrderRepository;
import com.shop.smoothie.repository.OrderSmoothieRepository;
import com.shop.smoothie.repository.SmoothieRepository;
import com.shop.smoothie.repository.UserRepository;
import com.shop.smoothie.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

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
  public void createOrder(OrderDTO dto) {
    Optional<UserEntity> createdBy = userRepository.findByUsername(dto.getCreatedBy());
    if (createdBy.isEmpty()) {
      throw new EntityNotFoundException(String.format("No user found with username %s", dto.getCreatedBy()));
    }

    OrderEntity order = new OrderEntity();
    order.setCreatedBy(createdBy.get());
    OrderEntity savedOrder = orderRepository.save(order);

    List<OrderSmoothieEntity> entities = new LinkedList<>();
    for (OrderSmoothieDTO orderSmoothie : dto.getSmoothies()) {
      Optional<SmoothieEntity> smoothie = smoothieRepository.findById(orderSmoothie.getSmoothieId());
      if (smoothie.isEmpty()) {
        throw new EntityNotFoundException(String.format("No smoothie found with id %d", orderSmoothie.getSmoothieId()));
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
