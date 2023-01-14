package com.smoothieshop.app.model.dto;

import javax.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class OrderSmoothieDTO {

  @Min(value = 1, message = "The field 'smoothieId' cannot be less than 1.")
  private final Long smoothieId;

  @Min(value = 1, message = "The field 'quantity' cannot be less than 1.")
  private final Integer quantity;
}
