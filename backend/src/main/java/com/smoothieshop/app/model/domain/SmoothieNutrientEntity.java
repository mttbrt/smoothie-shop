package com.smoothieshop.app.model.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
  @JoinColumn(name = "smoothie_id", nullable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private SmoothieEntity smoothie;

  @ManyToOne
  @JoinColumn(name = "nutrient_id", nullable = false)
  private NutrientEntity nutrient;

  @Column(nullable = false)
  private Float amount;
}
