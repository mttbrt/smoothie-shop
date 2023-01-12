package com.shop.smoothie.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderSmoothieDTO {

  private Long smoothieId;
  private Integer quantity;

}
