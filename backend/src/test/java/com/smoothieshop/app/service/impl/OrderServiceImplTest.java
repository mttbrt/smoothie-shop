package com.smoothieshop.app.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import com.smoothieshop.app.exception.EntityNotFoundException;
import com.smoothieshop.app.model.domain.SmoothieEntity;
import com.smoothieshop.app.model.domain.UserEntity;
import com.smoothieshop.app.model.dto.OrderDTO;
import com.smoothieshop.app.model.dto.OrderSmoothieDTO;
import com.smoothieshop.app.repository.OrderRepository;
import com.smoothieshop.app.repository.OrderSmoothieRepository;
import com.smoothieshop.app.repository.SmoothieRepository;
import com.smoothieshop.app.repository.UserRepository;
import java.util.LinkedList;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class OrderServiceImplTest {

  @InjectMocks
  private OrderServiceImpl service;

  @Mock
  private OrderRepository orderRepository;
  @Mock
  private OrderSmoothieRepository orderSmoothieRepository;
  @Mock
  private SmoothieRepository smoothieRepository;
  @Mock
  private UserRepository userRepository;

  @Test
  void createOrderOk() {
    UserEntity createdBy = new UserEntity(1L, "user", "password", "ROLE_USER");
    OrderSmoothieDTO s1 = new OrderSmoothieDTO(1L, 3);
    OrderSmoothieDTO s2 = new OrderSmoothieDTO(2L, 1);
    OrderDTO order = new OrderDTO(new LinkedList<>() {
      {
        add(s1);
        add(s2);
      }
    });

    when(userRepository.findByUsername(any())).thenReturn(Optional.of(createdBy));
    when(orderRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
    when(smoothieRepository.findById(any())).thenReturn(
        Optional.of(new SmoothieEntity(1L, "test", 0.0F)));

    // Test
    service.createOrder(order, createdBy.getUsername());
  }

  @Test
  void createOrderUserNotFoundEx() {
    UserEntity createdBy = new UserEntity(1L, "user", "password", "ROLE_USER");
    OrderSmoothieDTO s1 = new OrderSmoothieDTO(1L, 3);
    OrderSmoothieDTO s2 = new OrderSmoothieDTO(2L, 1);
    OrderDTO order = new OrderDTO(new LinkedList<>() {
      {
        add(s1);
        add(s2);
      }
    });

    when(userRepository.findByUsername(any())).thenReturn(Optional.empty());

    // Test
    Exception exception = assertThrows(EntityNotFoundException.class, () -> service.createOrder(order, createdBy.getUsername()));

    // Verify
    assertEquals("No user found with username " + createdBy.getUsername(), exception.getMessage());
  }

  @Test
  void createOrderSmoothieNotFoundEx() {
    UserEntity createdBy = new UserEntity(1L, "user", "password", "ROLE_USER");
    OrderSmoothieDTO s1 = new OrderSmoothieDTO(1L, 3);
    OrderSmoothieDTO s2 = new OrderSmoothieDTO(2L, 1);
    OrderDTO order = new OrderDTO(new LinkedList<>() {
      {
        add(s1);
        add(s2);
      }
    });

    when(userRepository.findByUsername(any())).thenReturn(Optional.of(createdBy));
    when(orderRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);
    when(smoothieRepository.findById(any())).thenReturn(Optional.empty());

    // Test
    Exception exception = assertThrows(EntityNotFoundException.class, () -> service.createOrder(order, createdBy.getUsername()));

    // Verify
    assertEquals("No smoothie found with id 1", exception.getMessage());
  }

}