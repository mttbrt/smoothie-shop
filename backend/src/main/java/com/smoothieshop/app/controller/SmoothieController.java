package com.smoothieshop.app.controller;

import com.smoothieshop.app.model.domain.SmoothieEntity;
import com.smoothieshop.app.model.dto.SmoothieDTO;
import com.smoothieshop.app.service.SmoothieService;
import com.sun.istack.NotNull;
import javax.annotation.security.RolesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "smoothies", produces = "application/json")
public class SmoothieController {

  private final SmoothieService smoothieService;

  public SmoothieController(@Autowired SmoothieService smoothieService) {
    this.smoothieService = smoothieService;
  }

  @GetMapping
  @RolesAllowed({"OWNER", "USER"})
  public SmoothieEntity[] getSmoothies() {
    return smoothieService.getSmoothies();
  }

  @GetMapping("/{id}")
  @RolesAllowed({"OWNER", "USER"})
  public SmoothieEntity getSmoothieById(@PathVariable @NotNull Long id) {
    return smoothieService.getSmoothieById(id);
  }

  @PutMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @RolesAllowed({"OWNER"})
  public void updateSmoothieById(@PathVariable @NotNull Long id,
      @RequestBody @Validated SmoothieDTO smoothieDTO) {
    smoothieService.updateSmoothieById(id, smoothieDTO);
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  @RolesAllowed({"OWNER"})
  public void deleteSmoothieById(@PathVariable @NotNull Long id) {
    smoothieService.deleteSmoothieById(id);
  }
}
