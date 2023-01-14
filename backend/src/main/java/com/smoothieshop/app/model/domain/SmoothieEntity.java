package com.smoothieshop.app.model.domain;

import com.smoothieshop.app.model.dto.SmoothieDTO;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tbl_smoothie")
public class SmoothieEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(unique = true, nullable = false)
  private String name;

  @Column(nullable = false)
  private Float price;

  public void updateValues(SmoothieDTO dto) {
    name = dto.getName() != null ? dto.getName() : name;
    price = dto.getPrice() != null ? dto.getPrice() : price;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    SmoothieEntity smoothie = (SmoothieEntity) o;

    if (!Objects.equals(id, smoothie.id)) {
      return false;
    }
    if (!Objects.equals(name, smoothie.name)) {
      return false;
    }
    return Objects.equals(price, smoothie.price);
  }
}
