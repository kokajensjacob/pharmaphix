package dev.kjj.pharmaphix.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Set;

@Entity
@Table(name = "problems")
@Getter
public class Problem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    private String description;

    private String instructions;

    @ManyToOne
    @JoinColumn(name = "machine_id", referencedColumnName = "id")
    private Machine machine;

    @OneToMany(mappedBy = "problem")
    private Set<ProblemSparePart> sparePartsNeeded;

    @ManyToMany
    @JoinTable(
            name = "problem_tools",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "tool_id"))
    private Set<Tool> tools;


}
