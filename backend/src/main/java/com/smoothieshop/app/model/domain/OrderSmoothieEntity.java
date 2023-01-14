package com.smoothieshop.app.model.domain;

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
@Entity(name = "tbl_order_smoothie")
public class OrderSmoothieEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private OrderEntity order;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "smoothie_id", nullable = false)
  private SmoothieEntity smoothie;

  @Column(nullable = false)
  private Integer quantity;
}
