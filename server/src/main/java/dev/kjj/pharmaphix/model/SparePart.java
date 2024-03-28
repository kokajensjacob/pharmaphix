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

    private int quantityInStock;

    private int optimalQuantity;

    private int quantityInRepair;

    private double cost;

    private double failureRate;

    private double repairTime;

    @ManyToOne
    @JoinColumn(name = "machine_id", referencedColumnName = "id")
    private Machine machine;

    @OneToMany(mappedBy = "sparePart")
    private Set<ProblemSparePart> associatedProblems;

    public SparePart() {
    }

    public SparePart(String name, int quantityInStock, double cost, double failureRate, double repairTime, Machine machine) {
        this.name = name;
        this.quantityInStock = quantityInStock;
        this.cost = cost;
        this.failureRate = failureRate;
        this.machine = machine;
        this.repairTime = repairTime;
        this.optimalQuantity = SparePartCalculator.optimalStockValue(this.failureRate * this.repairTime, this.cost, this.machine.getCost());
        this.quantityInRepair = 0;
    }

    public void setQuantityInStock(int newQuantity) {
        if (newQuantity < 0) {
            throw new IllegalStateException("There isn't enough inventory");
        }
        this.quantityInStock = newQuantity;
    }
}
