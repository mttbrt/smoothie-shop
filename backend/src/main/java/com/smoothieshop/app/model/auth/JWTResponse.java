package com.smoothieshop.app.model.auth;

import com.smoothieshop.app.model.dto.OrderSmoothieDTO;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class JWTResponse {

  private String token;

}
