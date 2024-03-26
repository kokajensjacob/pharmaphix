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

    @ManyToMany
    @JoinTable(
            name = "problem_spare_parts",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "spare_part_id"))
    private Set<SparePart> sparePart;

    @ManyToMany
    @JoinTable(
            name = "problem_tools",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "tool_id"))
    private Set<Tool> tools;


}
