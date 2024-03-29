package dev.kjj.pharmaphix.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Entity
@Table(name ="machines")
@Getter
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(name ="purchase_cost", nullable = false)
    private double cost;

    private int quantity;

    @OneToMany(mappedBy = "machine")
    private Set<SparePart> sparePart;

    @OneToMany(mappedBy = "machine")
    private Set<Problem> problems;

}
