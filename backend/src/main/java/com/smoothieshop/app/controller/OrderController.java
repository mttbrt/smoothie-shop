package com.smoothieshop.app.controller;

import com.smoothieshop.app.model.dto.OrderDTO;
import com.smoothieshop.app.service.OrderService;
import javax.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "orders", produces = "application/json")
public class OrderController {

  private final OrderService orderService;

  public OrderController(@Autowired OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  @RolesAllowed({"USER"})
  public void createOrder(@RequestBody @Validated OrderDTO orderDTO,
      @AuthenticationPrincipal UserDetails userDetails) {
    orderService.createOrder(orderDTO, userDetails.getUsername());
  }
}
