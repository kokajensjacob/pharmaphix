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

    @Column(nullable = false)
    private double repairTime;

    @ManyToOne
    @JoinColumn(name = "machine_id", referencedColumnName = "id")
    private Machine machine;

//    @ManyToMany(mappedBy = "sparePart")
//    private Set<Problem> problems;

    @OneToMany(mappedBy = "sparePart")
    private Set<ProblemSparePart> associatedProblems;

    public SparePart() {
    }

    public SparePart(String name, int quantityInStock, double cost, double failureRate, Machine machine) {
        this.name = name;
        this.quantityInStock = quantityInStock;
        this.cost = cost;
        this.failureRate = failureRate;
        this.machine = machine;
        this.optimalQuantity = SparePartCalculator.optimalStockValue(this.failureRate, this.cost, this.machine.getCost());
    }

    public void setQuantityInStock(int newQuantity) {
        if (newQuantity < 0) {
            throw new IllegalStateException("There isn't enough inventory");
        }
        this.quantityInStock = newQuantity;
    }
}
