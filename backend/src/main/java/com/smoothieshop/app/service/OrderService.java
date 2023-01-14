package com.smoothieshop.app.service;

import com.smoothieshop.app.model.domain.UserEntity;
import com.smoothieshop.app.model.dto.OrderDTO;

public interface OrderService {

  void createOrder(OrderDTO dto, String createdByUsername);

}
