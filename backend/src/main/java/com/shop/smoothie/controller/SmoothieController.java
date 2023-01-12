package com.shop.smoothie.controller;

import com.shop.smoothie.domain.entity.SmoothieEntity;
import com.shop.smoothie.domain.entity.SmoothieNutrientEntity;
import com.shop.smoothie.domain.model.SmoothieDTO;
import com.shop.smoothie.service.SmoothieService;
import com.sun.istack.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "smoothies", produces = "application/json")
public class SmoothieController {

  private final SmoothieService smoothieService;

  public SmoothieController(@Autowired SmoothieService smoothieService) {
    this.smoothieService = smoothieService;
  }

  @GetMapping
  public Iterable<SmoothieEntity> getSmoothies() {
    return smoothieService.getSmoothies();
  }

  @GetMapping("/{id}")
  public SmoothieEntity getSmoothieById(@PathVariable @NotNull Long id) {
    // TODO: getSmoothieById, validation, exception handling, etc.
    return null;
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void updateSmoothieById(@PathVariable @NotNull Long id, @RequestBody @Validated SmoothieDTO dto) {
    smoothieService.updateSmoothieById(id, dto);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteSmoothieById(@PathVariable @NotNull Long id) {
    smoothieService.deleteSmoothieById(id);
  }

}
