package dev.kjj.pharmaphix.model;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.AnyDiscriminator;
import org.hibernate.annotations.Check;

@Entity
@Table(name ="machines")
@Getter
//@Check(constraints = "purchase_cost > 0")
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Column(name ="purchase_cost", nullable = false)
    private double cost;

}
