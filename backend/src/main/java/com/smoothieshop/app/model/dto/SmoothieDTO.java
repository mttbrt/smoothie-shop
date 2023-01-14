package com.smoothieshop.app.model.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SmoothieDTO {

  @NotEmpty(message = "The field 'name' cannot be empty.")
  private final String name;

  @Min(value = 0, message = "The field 'price' cannot be negative.")
  private final Float price;
}
