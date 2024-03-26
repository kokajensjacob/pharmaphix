package dev.kjj.pharmaphix.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "spare_parts")
@Getter
@Setter
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

    @ManyToMany(mappedBy = "sparePart")
    private Set<Problem> problems;

    public void setQuantityInStock(int newQuantity) {
        if (newQuantity < 0) {
            throw new IllegalStateException("There isn't enough inventory");
        }
        this.quantityInStock = newQuantity;
    }
}
