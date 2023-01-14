package com.smoothieshop.app.controller;

import com.smoothieshop.app.model.domain.SmoothieNutrientEntity;
import com.smoothieshop.app.service.SmoothieNutrientService;
import com.sun.istack.NotNull;
import javax.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "smoothie-nutrients", produces = "application/json")
public class SmoothieNutrientController {

  private final SmoothieNutrientService smoothieNutrientService;

  public SmoothieNutrientController(@Autowired SmoothieNutrientService smoothieNutrientService) {
    this.smoothieNutrientService = smoothieNutrientService;
  }

  @GetMapping("/{id}")
  @RolesAllowed({"OWNER", "USER"})
  public SmoothieNutrientEntity[] getNutrientsBySmoothieId(@PathVariable @NotNull Long id) {
    return smoothieNutrientService.getNutrientsBySmoothieId(id);
  }
}
