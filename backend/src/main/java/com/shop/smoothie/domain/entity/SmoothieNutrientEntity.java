package com.shop.smoothie.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tbl_smoothie_nutrient")
public class SmoothieNutrientEntity {
  @Id
  @JsonIgnore
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @JsonIgnore
  @JoinColumn(name = "smoothie_id")
  private SmoothieEntity smoothie;

  @ManyToOne
  @JoinColumn(name = "nutrient_id")
  private NutrientEntity nutrient;

  private Float amount;
}
