package com.shop.smoothie.domain.entity;

import com.shop.smoothie.domain.model.SmoothieDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tbl_smoothie")
public class SmoothieEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(unique = true)
  private String name;
  private Float price;

  public void setDtoValues(SmoothieDTO dto) {
    name = dto.getName() != null ? dto.getName() : name;
    price = dto.getPrice() != null ? dto.getPrice() : price;
  }
}
