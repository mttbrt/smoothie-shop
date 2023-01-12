package com.shop.smoothie.service;

import com.shop.smoothie.domain.model.OrderDTO;

public interface OrderService {

  void createOrder(OrderDTO dto);

}
