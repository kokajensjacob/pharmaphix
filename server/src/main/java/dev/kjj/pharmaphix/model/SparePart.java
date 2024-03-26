package dev.kjj.pharmaphix.model;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Table(name = "spare_parts")
@Getter
public class SparePart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int quantityInStock;

    private int optimalQuantity;

    @Column(nullable = false)
    private double cost;

    @Column(nullable = false)
    private double failureRate;

    @ManyToOne
    @JoinColumn(name = "machine_id", referencedColumnName = "id")
    private Machine machine;
}
