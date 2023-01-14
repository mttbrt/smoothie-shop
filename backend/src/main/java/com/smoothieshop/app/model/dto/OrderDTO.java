package com.smoothieshop.app.model.dto;

import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO {

  @NotEmpty(message = "The field 'smoothies' cannot be empty.")
  private List<@Valid OrderSmoothieDTO> smoothies;
}
