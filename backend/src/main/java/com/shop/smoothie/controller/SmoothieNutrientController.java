package com.shop.smoothie.controller;

import com.shop.smoothie.domain.entity.SmoothieNutrientEntity;
import com.shop.smoothie.service.SmoothieNutrientService;
import com.sun.istack.NotNull;
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
  public Iterable<SmoothieNutrientEntity> getNutrientsBySmoothieId(@PathVariable @NotNull Long id) {
    return smoothieNutrientService.getNutrientsBySmoothieId(id);
  }

}
