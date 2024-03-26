package dev.kjj.pharmaphix.model;

import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.AnyDiscriminator;
import org.hibernate.annotations.Check;

import java.util.Set;

@Entity
@Table(name ="machines")
@Getter
public class Machine {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Column(name ="purchase_cost", nullable = false)
    private double cost;

    @OneToMany(mappedBy = "machine")
    private Set<SparePart> sparePart;

    @OneToMany(mappedBy = "machine")
    private Set<Problem> problem;

}
